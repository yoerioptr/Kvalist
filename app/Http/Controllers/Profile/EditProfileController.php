<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\InertiaController;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\RouteAttributes\Attributes\Get;

final class EditProfileController extends InertiaController
{
    #[Get(uri: '/profile', name: 'profile.edit', middleware: 'auth')]
    public function __invoke(Request $request): Response
    {
        return $this->render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
}
