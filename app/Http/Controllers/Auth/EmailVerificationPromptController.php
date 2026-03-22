<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\InertiaController;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\RouteAttributes\Attributes\Get;

final class EmailVerificationPromptController extends InertiaController
{
    #[Get(uri: 'verify-email', name: 'verification.notice', middleware: 'auth')]
    public function __invoke(Request $request): RedirectResponse|Response
    {
        return $request->user()->hasVerifiedEmail()
            ? redirect()->intended(route('dashboard', absolute: false))
            : $this->render('Auth/VerifyEmail', ['status' => session('status')]);
    }
}
