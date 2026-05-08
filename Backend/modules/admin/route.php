<?php
declare(strict_types=1);

require_once __DIR__ . '/login.php';
require_once __DIR__ . '/planes.php';

function route_admin(string $action, PDO $pdo): bool
{
    switch ($action) {
        case 'login_admin':
            admin_login($pdo);
            return true;

        case 'logout_admin':
            admin_logout();
            return true;

        case 'sesion_admin_actual':
            admin_session_actual();
            return true;

        case 'admin_planes_guardar':
            admin_planes_guardar($pdo);
            return true;
    }

    return false;
}
