<?php
declare(strict_types=1);

require_once __DIR__ . '/actions.php';

function route_login(string $action, PDO $pdo): bool
{
    switch ($action) {
        case 'login_admin':
            login_admin($pdo);
            return true;

        case 'logout_admin':
            logout_admin();
            return true;

        case 'sesion_admin_actual':
            sesion_admin_actual();
            return true;
    }

    return false;
}