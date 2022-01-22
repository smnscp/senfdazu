<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['slug', 'readable', 'writable'];

    /**
     * Get the Post’s comments.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Get the Post’s immediate comments (i. e. no replies to comments).
     */
    public function rootComments()
    {
        return $this->comments()->where('parent_id', null);
    }

    /**
     * Get the Post’s comments as a list of trees.
     */
    public function commentForest()
    {
        return $this->rootComments()->with('progeny');
    }

    public function createComment(array $values)
    {
        $values['lid'] = $this->count + 1;
        $values['token'] = Str::random(64);
        $comment = $this->comments()->create($values);
        $this->increment('count');
        return $comment;
    }
}
