<?php

namespace App\Http\Controllers\Auth\RegisteredUser;

use App\Http\Controllers\InertiaController;
use Inertia\Response;

use Spatie\RouteAttributes\Attributes\Get;

final class CreateRegisteredUserController extends InertiaController
{
    #[Get(uri: 'register', name: 'register', middleware: 'guest')]
    public function __invoke(): Response
    {
        return $this->render('Auth/Register');
    }
}
