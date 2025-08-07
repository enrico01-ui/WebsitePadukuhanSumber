<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Umkm extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'owner_name',
        'contact',
        'address',
        'description',
    ];

    protected $table = 'umkms';
    protected $primaryKey = 'id';

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    // Hubungan ke Produk
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}

