<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AiExtraction extends Model
{
  protected $fillable = [
    'document_id',
    'document_type'
    'extracted_metadata',
    'confidence_score'
  ];


  protected $casts = [
    'extracted_metadata' => 'array',
    'confidence_score' => 'float',
  ];

  public function document()
  {
    return $this->belongsTo(Document::class);
  }
}
