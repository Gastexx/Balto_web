<?php
declare(strict_types=1);

require_once __DIR__ . '/../admin/admin_planes.php';

function route_web_admin(string $action, PDO $pdo): bool
{
    if (function_exists('route_admin_planes') && route_admin_planes($action, $pdo)) {
        return true;
    }

    return false;
}