<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Document extends Model
{
  use HasUuids;

  protected $fillable = [
    'title',
    'file_path',
    'original_hash',
    'signed_hash',
    'status',
    'user_id'
  ];


  public function initiator()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  public function aiExtraction()
  {
    return $this->hasOne(AiExtraction::class);
  }

  public function workflows()
  {
    return $this->hasMany(Workflow::class)->orderBy('step_order', 'asc');
  }

  public function auditLog()
  {
    return $this->hasMany(AuditLog::class);
  }
}
