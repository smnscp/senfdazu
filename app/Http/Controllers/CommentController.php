<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class CommentController extends Controller
{
    /**
     * Get a listing of all comments.
     *
     * @return Response
     */
    public function index()
    {
        return Comment::all();
    }

    /**
     * Store a newly created comment in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        return Comment::create([
            'slug' => $request->slug,
            'message' => $request->message,
            'name' => $request->name,
            'email' => $request->email,
            'ip' => $request->ip(),
            'token' => Str::random(64),
        ]);
    }

    /**
     * Retrieve the comment for the given ID.
     *
     * @param int $id
     * @return Response
     */
    public function show(int $id)
    {
        return Comment::findOrFail($id);
    }

    /**
     * Update the specified comment in storage.
     *
     * @param Request $request
     * @param Comment $comment
     * @return Response
     */
    public function update(Request $request, Comment $comment)
    {
        // TODO: Authentication Header (token)
    }

    /**
     * Remove the specified comment from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy(Request $request, int $id)
    {
        $comment = Comment::findOrFail($id);
        if ($comment->token !== $request->token) abort(403);
        $comment->delete();
    }
}
