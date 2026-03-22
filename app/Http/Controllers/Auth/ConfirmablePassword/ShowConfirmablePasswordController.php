<?php

namespace App\Http\Controllers\Auth\ConfirmablePassword;

use App\Http\Controllers\InertiaController;
use Inertia\Response;
use Spatie\RouteAttributes\Attributes\Get;

final class ShowConfirmablePasswordController extends InertiaController
{
    #[Get(uri: 'confirm-password', name: 'password.confirm', middleware: 'auth')]
    public function __invoke(): Response
    {
        return $this->render('Auth/ConfirmPassword');
    }
}
