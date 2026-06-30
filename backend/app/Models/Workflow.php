<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Workflow extends Model
{
    protected $fillable = [
        'document_id',
        'signer_email',  // Who needs to sign this step
        'step_order',    // Step 1, Step 2, etc.
        'status',        // 'pending', 'approved', 'rejected'
        'signed_at'
    ];

    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class);
    }
}
