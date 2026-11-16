<?php

namespace App\Http\Controllers;
use App\Models\Laporan;

use Illuminate\Http\Request;

class LaporanController extends Controller
{
    
    public function index()
    {
        return Laporan::all();
    }
    public function show($id)
    {
        return Laporan::findOrFail($id);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('laporan'), $filename);
            $data['file'] = $filename;
        }

        return Laporan::create($data);
    }

    public function update(Request $request, $id)
    {
        $laporan = Laporan::findOrFail($id);
        $data = $request->all();

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('laporan'), $filename);
            $data['file'] = $filename;
        }

        $laporan->update($data);
        return $laporan;
    }

    public function delete($id)
    {
        Laporan::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }   

    
}
