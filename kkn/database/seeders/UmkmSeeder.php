<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Umkm;

class UmkmSeeder extends Seeder
{
    public function run(): void
    {
        Umkm::insert([
            [
                'name' => 'Warung Gudeg Bu Sari',
                'owner_name' => 'Sari Wahyuni',
                'contact' => '081234567890',
                'address' => 'Padukuhan Sumber RT 01',
                'description' => 'Menjual gudeg jogja khas Yogyakarta',
            ],
            [
                'name' => 'Kerajinan Bambu Pak Joko',
                'owner_name' => 'Joko Santoso',
                'contact' => '082345678901',
                'address' => 'Padukuhan Sumber RT 03',
                'description' => 'Menyediakan kerajinan dari bambu asli',
            ],
            [
                'name' => 'Toko Kelontong Ibu Rina',
                'owner_name' => 'Rina Sari',
                'contact' => '083456789012',
                'address' => 'Padukuhan Sumber RT 02',
                'description' => 'Menjual sembako dan perlengkapan harian',
            ],
            [
                'name' => 'Salon Cantik Wanita',
                'owner_name' => 'Dewi Lestari',
                'contact' => '084567890123',
                'address' => 'Padukuhan Sumber RT 05',
                'description' => 'Salon khusus wanita dengan layanan lengkap',
            ],
            [
                'name' => 'Warung Pecel Lele',
                'owner_name' => 'Bambang Irawan',
                'contact' => '085678901234',
                'address' => 'Padukuhan Sumber RT 04',
                'description' => 'Menjual pecel lele dan aneka lalapan',
            ],
        ]);
    }
}
