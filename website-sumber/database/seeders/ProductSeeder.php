<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::insert([
            [
                'umkm_id' => 1,
                'name' => 'Gudeg Jogja Spesial',
                'price' => 25000,
                'description' => 'Gudeg khas Yogyakarta dengan krecek dan telur',
                'image_url' => 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&h=400&fit=crop'
            ],
            [
                'umkm_id' => 2,
                'name' => 'Keranjang Bambu',
                'price' => 75000,
                'description' => 'Keranjang handmade dari bambu lokal',
                'image_url' => 'https://images.unsplash.com/photo-1583744946564-b52e8a7d3699?w=800&h=400&fit=crop'
            ],
            [
                'umkm_id' => 5,
                'name' => 'Pecel Lele Jumbo',
                'price' => 18000,
                'description' => 'Lele besar goreng dengan sambal pedas',
                'image_url' => 'https://images.unsplash.com/photo-1626082925589-b4fa68c0171b?w=800&h=400&fit=crop'
            ],
            [
                'umkm_id' => 2,
                'name' => 'Tas Anyaman',
                'price' => 45000,
                'description' => 'Tas anyaman bambu model terbaru',
                'image_url' => 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=400&fit=crop'
            ],
            [
                'umkm_id' => 4,
                'name' => 'Paket Creambath',
                'price' => 50000,
                'description' => 'Layanan creambath lengkap untuk wanita',
                'image_url' => 'https://images.unsplash.com/photo-1599058918145-21a39e0ea7de?w=800&h=400&fit=crop'
            ]
        ]);
    }
}
