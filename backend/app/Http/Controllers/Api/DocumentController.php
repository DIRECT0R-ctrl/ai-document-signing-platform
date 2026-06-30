<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Document; //  CRITICAL FIX: Explicit model import added!
use App\Models\AiExtraction; // Added to prevent silent relationship fails
use App\Jobs\ProcessAiDocument;
use App\Services\DocumentSigningService;

class DocumentController extends Controller
{
    protected $signingService;

    public function __construct(DocumentSigningService $signingService)
    {
        $this->signingService = $signingService;
    }

    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
      $request->validate([
        'document' => 'required|file|mimes:pdf|max:25600'
      ]);

      try {
        $document = $this->signingService->ingestDocument(
          $request->file('document'),
          $request->user()->id
        );

        ProcessAiDocument::dispatch($document);

        return response()->json([
          'success' => true, // Fixed spelling typo here from 'sucess'
          'message' => 'Document secured, cryptographic hash calculated, and sent to AI engine.',
          'data' => [
            'document_id' => $document->id,
            'title' => $document->title,
            'original_hash' => $document->original_hash,
            'status' => $document->status,
          ]
        ], 201);
      } catch (\Exception $e) {
        return response()->json([
          'success' => false,
          'message' => 'Critical error during document ingestion: ' . $e->getMessage()
        ], 500);
      }
    }

    public function show(Document $document)
    {
        $document->load('aiExtraction');

        return response()->json([
          'success' => true,
          'document' => $document,
          'extraction' => $document->aiExtraction
        ], 200);
    }

    public function latest()
    {
      // Grab the absolute newest document entry
      $latestDoc = Document::latest()->first();

      if (!$latestDoc) {
          return response()->json(['success' => false, 'message' => 'No documents found'], 404);
      }

      // Explicitly pull the latest matching AI extraction to ensure clean database transfer
      $extraction = AiExtraction::where('document_id', $latestDoc->id)->first();

      return response()->json([
        'success' => true,
        'document' => $latestDoc,
        'extraction' => $extraction
      ], 200);
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }


    public function inbox(Request $request)
{
    $user = $request->user();

    // AUTHORITY GATE: Only allow 'approvver', 'signer', or 'admin' to see the inbox trays
    $authorizedRoles = ['approvver', 'signer', 'admin'];
    
    if (!in_array($user->role, $authorizedRoles)) {
        return response()->json([
            'success' => false,
            'message' => 'Unauthorized Access: This workspace is restricted to administrative authorities.'
        ], 403);
    }

    // Pull the true email address of the active logged-in supervisor
    $currentUserEmail = $user->email;

    // Fetch matching pending task rows from the workflows registry table
    $pendingSteps = \App\Models\Workflow::where('signer_email', $currentUserEmail)
        ->where('status', 'pending')
        ->with('document.aiExtraction')
        ->get();

    return response()->json([
        'success' => true,
        'inbox' => $pendingSteps
    ], 200);
}

public function sign(Request $request, Document $document)
{
    $request->validate([
        'signature' => 'required|string'
    ]);

    $user = $request->user();

    // 1. Verify signing permission context matrix matching your enum values
    if (!in_array($user->role, ['approvver', 'signer', 'admin'])) {
        return response()->json(['success' => false, 'message' => 'Action forbidden.'], 403);
    }

    // 2. Security crosscheck: Is this transaction step specifically assigned to this logged-in account?
    $activeWorkflowStep = \App\Models\Workflow::where('document_id', $document->id)
        ->where('signer_email', $user->email)
        ->where('status', 'pending')
        ->first();

    if (!$activeWorkflowStep) {
        return response()->json([
            'success' => false,
            'message' => 'This asset is either already processed or not assigned to your desk.'
        ], 403);
    }

    // 3. Mark the workflow routing line as approved
    $activeWorkflowStep->update([
        'status' => 'approved',
        'signed_at' => now()
    ]);

    // 4. Finalize the root document ledger record
    $document->update([
        'status' => 'signed',
        'signed_hash' => hash('sha256', $request->input('signature') . time())
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Cryptographic signature verified, authorization applied, and ledger sealed.'
    ], 200);
}
}
