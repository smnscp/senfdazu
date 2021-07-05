<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Comment;
use Carbon\Carbon;
use Illuminate\Http\Request;


/**
 * Throttle posting of comments.
 * This simple middleware forbids too many Comments from the same IP address
 * within a certain period of time.
 */
class CommentThrottleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param  Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $max = Comment::where('ip', $request->ip())->count();

        for ($i = 1; $i <= min(10, $max); $i++) {
            // Allow {$i} Comments within the last {$i}^2 minutes.
            $count = Comment::where('ip', $request->ip())
                ->where('created_at', '>', Carbon::now()->subMinutes($i ** 2))
                ->count();
            if ($count >= $i) {
                return response('Too eager!', 403);
            }
        }

        return $next($request);
    }
}
