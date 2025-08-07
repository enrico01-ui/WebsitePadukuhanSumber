<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laporan extends Model
{
     use HasFactory;

    protected $table = 'laporans';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'nama_laporan',
        'file',
        'created_at',
        'updated_at',
    ];
}
