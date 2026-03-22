<?php

namespace App\Http\Controllers\Auth\PasswordResetLink;

use App\Http\Controllers\InertiaController;
use Inertia\Response;
use Spatie\RouteAttributes\Attributes\Get;

final class CreatePasswordResetLinkController extends InertiaController
{
    #[Get(uri: 'forgot-password', name: 'password.request', middleware: 'guest')]
    public function __invoke(): Response
    {
        return $this->render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }
}
