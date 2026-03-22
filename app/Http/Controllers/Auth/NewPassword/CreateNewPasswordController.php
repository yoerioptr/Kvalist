<?php

namespace App\Http\Controllers\Auth\NewPassword;

use App\Http\Controllers\InertiaController;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\RouteAttributes\Attributes\Get;

final class CreateNewPasswordController extends InertiaController
{
    #[Get(uri: 'reset-password/{token}', name: 'password.reset', middleware: 'guest')]
    public function __invoke(Request $request): Response
    {
        return $this->render('Auth/ResetPassword', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]);
    }
}
