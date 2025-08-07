<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'umkm_id',
        'name',
        'price',
        'description',
        'image_url',
    ];

    // Hubungan ke UMKM
    public function umkm()
    {
        return $this->belongsTo(Umkm::class);
    }
}
