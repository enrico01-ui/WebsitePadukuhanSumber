<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Galeri;

class GaleriController extends Controller
{
    
    public function index()
    {
        return Galeri::all();
    }

    public function show($id)
    {
        return Galeri::findOrFail($id);
    }

    public function store(Request $request)
{
    $data = $request->all();

    if ($request->hasFile('gambar')) {
        $file = $request->file('gambar');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('galeri'), $filename);
        $data['gambar'] = $filename;
    }

    return Galeri::create($data);
}

public function update(Request $request, $id)
{
    $galeri = Galeri::findOrFail($id);
    $data = $request->all();    

    if ($request->hasFile('gambar')) {
        $file = $request->file('gambar');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('galeri'), $filename);
        $data['gambar'] = $filename;
    }

    $galeri->update($data);
    return $galeri;
}


    public function destroy($id)
    {
        Galeri::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
