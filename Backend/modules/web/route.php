<?php
declare(strict_types=1);

require_once __DIR__ . '/../admin/planes.php';

function web_planes_listar(PDO $pdo): void
{
    $planes = obtener_planes_saas($pdo, true);

    echo json_encode([
        'exito' => true,
        'data' => $planes,
        'planes' => $planes,
    ], JSON_UNESCAPED_UNICODE);
}

function web_home_obtener(PDO $pdo): void
{
    $planes = obtener_planes_saas($pdo, true);

    // La web ahora tiene Header, Hero, Beneficios, Testimonios y Footer fijos en React.
    // Desde la base solo se exponen los planes.
    echo json_encode([
        'exito' => true,
        'data' => [
            'plans' => $planes,
            'planes' => $planes,
        ],
    ], JSON_UNESCAPED_UNICODE);
}

function route_web(string $action, PDO $pdo): bool
{
    switch ($action) {
        case 'web_home_obtener':
            web_home_obtener($pdo);
            return true;

        case 'web_planes_listar':
            web_planes_listar($pdo);
            return true;
    }

    return false;
}
