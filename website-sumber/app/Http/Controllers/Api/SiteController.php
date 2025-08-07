<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Site;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    public function index()
    {
        return Site::all();
    }

    public function show($id)
    {
        return Site::findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|string',
        ]);

        return Site::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $site = Site::findOrFail($id);
        $site->update($request->all());
        return $site;
    }

    public function destroy($id)
    {
        Site::destroy($id);
        return response()->json(['message' => 'Site deleted']);
    }
}

