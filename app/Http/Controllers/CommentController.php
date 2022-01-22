<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CommentController extends Controller
{
    /**
     * Get a listing of all Comments of a Post.
     *
     * @param string $slug The Post’s slug.
     * @return Response
     */
    public function index(string $slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        return $post->commentForest()->get();
    }

    /**
     * Store a newly created Comment in storage.
     *
     * @param Request $request
     * @param string $slug The Post’s slug.
     * @return Response
     */
    public function store(Request $request, string $slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        return $post->createComment([
            'message' => $request->message,
            'name' => $request->name,
            'email' => $request->email,
            'ip' => $request->ip(),
        ]);
    }

    /**
     * Retrieve the Comment for the given slug + local ID.
     *
     * @param string $slug The Post’s slug.
     * @param int $lid The Comment’s local ID.
     * @return Response
     */
    public function show(string $slug, int $lid)
    {
        return Post::where('slug', $slug)->firstOrFail()
            ->comments()->where('lid', $lid)->firstOrFail();
    }

    /**
     * Store a newly created Comment in storage, as reply to the specified one.
     *
     * @param Request $request
     * @param string $slug The Post’s slug.
     * @param int $lid The Comment’s local ID.
     * @return Response
     */
    public function reply(Request $request, string $slug, int $lid)
    {
        $parent = Post::where('slug', $slug)->firstOrFail()
            ->comments()->where('lid', $lid)->firstOrFail();
        return $parent->createChild([
            'message' => $request->message,
            'name' => $request->name,
            'email' => $request->email,
            'ip' => $request->ip(),
        ]);
    }

    /**
     * Update the specified Comment in storage.
     *
     * @param Request $request
     * @param string $slug The Post’s slug.
     * @param int $lid The Comment’s local ID.
     * @return Response
     */
    public function update(Request $request, string $slug, int $lid)
    {
        // TODO: Authentication Header (token)
        $comment = Post::where('slug', $slug)->firstOrFail()
            ->comments()->where('lid', $lid)->firstOrFail();
        // return $comment->update(…);
    }

    /**
     * Remove the specified Comment from storage.
     *
     * @param string $slug The Post’s slug.
     * @param int $lid The Comment’s local ID.
     * @return Response
     */
    public function destroy(Request $request, string $slug, int $lid)
    {
        $comment = Post::where('slug', $slug)->firstOrFail()
            ->comments()->where('lid', $lid)->firstOrFail();
        if ($comment->token !== $request->token) abort(403);
        $comment->delete();
    }
}
