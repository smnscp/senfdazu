<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;
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
        'email',
        'token',
        'ip',
        'approved',
        'post_id',
    ];
    protected $appends = [
        'email_hash'
    ];

    protected static function booted()
    {
        static::addGlobalScope('approved', function (Builder $builder) {
            $builder->where('approved', true);
        });
    }

    /**
     * Get the email hash.
     *
     * @return string
     */
    public function getEmailHashAttribute()
    {
        return hash('sha256', $this->email);
    }

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

    public function ancestry()
    {
        return $this->parent()->with('ancestry');
    }

    /**
     * Get the child comments.
     */
    public function children()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    public function progeny()
    {
        return $this->children()->with('progeny');
    }


    public function createChild(array $values)
    {
        $child = $this->post->createComment($values);
        $child->parent()->associate($this);
        $child->save();
        return $child;
    }
}
