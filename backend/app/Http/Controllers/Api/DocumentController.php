<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DocumentController extends Controller
{

   protected DocumentSigningService $SigningService

   public function __construct(DocumentSigningService $SigningService)
   {
     $this->signingService = $signingService;
   }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      $request->validate([
        'document' => 'required|file|mims:pdf|max:25600'
      ]);

      try {
        $document = $this->signingService->ingestDocument(
          $request->file('document'),
          $request->user()->id
        );

        // TODO: Dispatch AI Processing Background

        return response()->json([
          'sucess' => true,
          'message' => 'Document secured, cryptographic hash calculated, and sent to AI engine.',
          'data' => [
            'document_id' => $document->id,
            'title' => $document->title,
            'original_hash' => $document->original_hash,
            'status' => $document->status,
          ]
        ],201);
      } catch (\Exception $e) {
        return response()->json([
          'success' => false,
          'message' => 'Critical error during document ingestion: ' . $e->getMessage()
        ], 500);
      }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
