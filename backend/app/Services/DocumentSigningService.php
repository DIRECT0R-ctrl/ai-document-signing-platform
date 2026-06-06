<?php

namespace App\Services;

use App\Models\Document;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class DocumentSigningService
{
  public function ingestDocument(UploadedFile $file, int $userId)
  {
    originalHash = hash_file(
      'sha256',
      $file->getRealPath()
    );

    // store the file securly
    $securedPath = $file->store('secure_docs');

    // save database record

    return Document::create([
      'title' => $file->getClientOriginalName(),
      'file_path' => $securedPath,
      'original_hash' => $originalHash,
      'status' => 'processing_ai',
      'user_id' => $userId,
    ]);
  }
}
