<?php

namespace App\Http\Controllers\Auth\PasswordResetLink;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Spatie\RouteAttributes\Attributes\Post;

final class StorePasswordResetLinkController extends Controller
{
    #[Post(uri: 'forgot-password', name: 'password.email', middleware: 'guest')]
    public function __invoke(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status == Password::RESET_LINK_SENT) {
            return back()->with('status', __($status));
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}
