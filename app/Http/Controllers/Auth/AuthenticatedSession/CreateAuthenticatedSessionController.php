<?php

namespace App\Http\Controllers\Auth\AuthenticatedSession;

use App\Http\Controllers\InertiaController;
use Illuminate\Support\Facades\Route;
use Inertia\Response;
use Spatie\RouteAttributes\Attributes\Get;

final class CreateAuthenticatedSessionController extends InertiaController
{
    #[Get(uri: 'login', name: 'login', middleware: 'guest')]
    public function __invoke(): Response
    {
        return $this->render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }
}
