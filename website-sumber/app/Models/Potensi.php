<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Potensi extends Model
{
    protected $table = 'potensis';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'nama',
        'deskripsi',
        'penanggung_jawab',
        'gambar',
        'jenis',
        'created_at',
        'updated_at'
    ];

 
}
