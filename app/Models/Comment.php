<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'message',
        'name',
        'email',
        'lid',
        'ip',
        'token',
    ];
    protected $hidden = [
        'token',
        'ip',
        'approved',
        'post_id',
    ];

    /**
     * Get the parent comment.
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    /**
     * Get the parent comment.
     */
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    /**
     * Get the child comments.
     */
    public function children()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }


    public function createChild(array $values)
    {
        $child = $this->post->createComment($values);
        $child->parent()->associate($this);
        $child->save();
        return $child;
    }
}
