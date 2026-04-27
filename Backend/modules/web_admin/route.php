<?php
declare(strict_types=1);

require_once __DIR__ . '/controller.php';

function route_web_admin(string $action, PDO $pdo): bool
{
    switch ($action) {
        case 'admin_config_guardar':
            web_admin_config_guardar($pdo);
            return true;

        case 'admin_features_guardar':
            web_admin_features_guardar($pdo);
            return true;

        case 'admin_testimonials_guardar':
            web_admin_testimonials_guardar($pdo);
            return true;
    }

    return false;
}