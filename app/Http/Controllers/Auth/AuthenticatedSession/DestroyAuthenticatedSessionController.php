<?php

namespace App\Http\Controllers\Auth\AuthenticatedSession;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\RouteAttributes\Attributes\Post;

final class DestroyAuthenticatedSessionController extends Controller
{
    #[Post(uri: 'logout', name: 'logout', middleware: 'auth')]
    public function __invoke(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
