<?php

namespace App\Http\Controllers;
use App\Models\Potensi;

use Illuminate\Http\Request;

class PotensiController extends Controller
{
    
    public function index()
    {
        return Potensi::all();
    }

    public function show($id)
    {
        return Potensi::findOrFail($id);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/potensi'), $filename);
            $data['gambar'] = $filename;
        }

        return Potensi::create($data);
    }

    public function update(Request $request, $id)
    {
        $potensi = Potensi::findOrFail($id);
        $data = $request->all();

        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/potensi'), $filename);
            $data['gambar'] = $filename;
        }

        $potensi->update($data);
        return $potensi;
    }


    public function destroy($id)
    {
        Potensi::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
