<?php

namespace App\Jobs;

use App\Models\Document;
use App\Models\AiExtraction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

// "implements ShouldQueue" tells Laravel: "Do not execute this immediately. 
// Push it to the database queue table instead."
class ProcessAiDocument implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    // This variable will hold our document model so the job knows which file to process.
    protected Document $document;

    /**
     * The Constructor: This runs the exact millisecond you dispatch the job.
     * It captures the document data from your controller.
     */
    public function __construct(Document $document)
    {
        $this->document = $document;
    }

    /**
     * The Handle Method: This is the actual execution engine. 
     * This code ONLY runs when the background queue worker pulls it out of the database.
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

            // 4. Save Python's OCR & NLP results directly into our PostgreSQL table
            AiExtraction::create([
                'document_id' => $this->document->id,
                'document_type' => $aiData['document_type'],
                'extracted_metadata' => $aiData['extracted_metadata'], // Automatically saves as JSONB!
                'confidence_score' => $aiData['confidence_score'],
            ]);

            // 5. Update the status so the student/dean sees it updated on the dashboard
            $this->document->update([
                'status' => 'pending_approval'
            ]);
            
        } else {
            // If Python crashed or was offline, throw an error. 
            // Laravel will automatically mark the job as "failed" so you can retry it later.
            throw new \Exception("Python AI Microservice failed with status: " . $response->status());
        }
    }
}
