<?php

namespace App\Jobs;

use App\Models\Document;
use App\Models\AiExtraction;
use App\Models\Workflow; // 💎 Added so we can create workflow steps
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class ProcessAiDocument implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected Document $document;

    /**
     * The Constructor
     */
    public function __construct(Document $document)
    {
        $this->document = $document;
    }

    /**
     * The Handle Method: This executes in your background terminal via queue:work
     */
    public function handle(): void
    {
        // 1. Find where the PDF file lives on our server
        $filePath = storage_path('app/private/' . $this->document->file_path);

        // 2. Open a secure HTTP connection and send the file to our Python FastAPI server
        $response = Http::attach(
            'file',                           // The field name Python expects
            file_get_contents($filePath),     // The raw binary data of the PDF
            basename($filePath)               // The filename
        )->post('http://127.0.0.1:8000/analyze');

        // 3. Check if Python processed it successfully
        if ($response->successful()) {
            $aiData = $response->json();

            // 4. Save Python's OCR & NLP results directly into our database table
            AiExtraction::create([
                'document_id' => $this->document->id,
                'document_type' => $aiData['document_type'] ?? 'Academic Asset',
                'extracted_metadata' => $aiData['extracted_metadata'] ?? [], 
                'confidence_score' => $aiData['confidence_score'] ?? 1.0,
            ]);

            // 🏛️ 5. ENTERPRISE LOGIC: Dynamic Routing Generation
            // We inspect the data text Python extracted to see who should sign this document
            $partiesText = $aiData['extracted_metadata']['parties'] ?? '';

            // Set a default university signer
            $targetSigner = 'registrar@aui.ma'; 

            // If the AI finds text matching Al Akhawayn's School of Science and Engineering, route it to the Dean
            if (str_contains(strtolower($partiesText), 'school of science and engineering') || str_contains(strtolower($partiesText), 'sse')) {
                $targetSigner = 'sse_dean@aui.ma'; 
            }

            // 6. Register Step 1 in your workflows table for the target supervisor
            Workflow::create([
                'document_id' => $this->document->id,
                'signer_email' => $targetSigner,
                'step_order' => 1,
                'status' => 'pending'
            ]);

            // 7. Update the global document lifecycle state matrix
            $this->document->update([
                'status' => 'pending_review'
            ]);

        } else {
            // If Python crashed or was offline, throw an error.
            throw new \Exception("Python AI Microservice failed with status: " . $response->status());
        }
    }
}
