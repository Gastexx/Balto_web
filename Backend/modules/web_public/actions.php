<?php
declare(strict_types=1);

function web_config_obtener(PDO $pdo): void
{
    $stmt = $pdo->query("SELECT clave, valor, tipo FROM site_config ORDER BY clave ASC");
    $rows = $stmt->fetchAll();

    $config = [];
    foreach ($rows as $row) {
        $config[$row['clave']] = [
            'valor' => $row['valor'],
            'tipo'  => $row['tipo'],
        ];
    }

    echo json_encode([
        'exito' => true,
        'data'  => $config
    ], JSON_UNESCAPED_UNICODE);
}

function web_features_listar(PDO $pdo): void
{
    $stmt = $pdo->query("
        SELECT id, titulo, texto, orden, activo
        FROM site_features
        WHERE activo = 1
        ORDER BY orden ASC, id ASC
    ");
    $items = $stmt->fetchAll();

    echo json_encode([
        'exito' => true,
        'data'  => $items
    ], JSON_UNESCAPED_UNICODE);
}

function web_planes_listar(PDO $pdo): void
{
    $stmt = $pdo->query("
        SELECT 
            id, 
            nombre, 
            precio, 
            nota, 
            descripcion, 
            incluye, 
            destacado, 
            orden, 
            activo
        FROM planes_saas
        WHERE activo = 1
        ORDER BY orden ASC, id ASC
    ");
    $planes = $stmt->fetchAll();

    foreach ($planes as &$plan) {
        $plan['incluye'] = normalizar_incluye($plan['incluye'] ?? '');
    }
    unset($plan);

    echo json_encode([
        'exito' => true,
        'data'  => $planes
    ], JSON_UNESCAPED_UNICODE);
}

function web_testimonials_listar(PDO $pdo): void
{
    $stmt = $pdo->query("
        SELECT id, nombre, rol, cita, orden, activo
        FROM site_testimonials
        WHERE activo = 1
        ORDER BY orden ASC, id ASC
    ");
    $items = $stmt->fetchAll();

    echo json_encode([
        'exito' => true,
        'data'  => $items
    ], JSON_UNESCAPED_UNICODE);
}

function web_hero_media_obtener(PDO $pdo): void
{
    $stmt = $pdo->query("
        SELECT id, tipo, url, nombre_archivo, mime_type, tamanio_bytes, activo
        FROM hero_media
        WHERE activo = 1
        ORDER BY id DESC
        LIMIT 1
    ");
    $item = $stmt->fetch();

    echo json_encode([
        'exito' => true,
        'data'  => $item ?: null
    ], JSON_UNESCAPED_UNICODE);
}

function web_home_obtener(PDO $pdo): void
{
    $stmtConfig = $pdo->query("SELECT clave, valor, tipo FROM site_config ORDER BY clave ASC");
    $configRows = $stmtConfig->fetchAll();

    $config = [];
    foreach ($configRows as $row) {
        $config[$row['clave']] = [
            'valor' => $row['valor'],
            'tipo'  => $row['tipo'],
        ];
    }

    $stmtFeatures = $pdo->query("
        SELECT id, titulo, texto, orden
        FROM site_features
        WHERE activo = 1
        ORDER BY orden ASC, id ASC
    ");
    $features = $stmtFeatures->fetchAll();

    $stmtPlans = $pdo->query("
        SELECT 
            id, 
            nombre, 
            precio, 
            nota, 
            descripcion, 
            incluye, 
            destacado, 
            orden,
            activo
        FROM planes_saas
        WHERE activo = 1
        ORDER BY orden ASC, id ASC
    ");
    $plans = $stmtPlans->fetchAll();

    foreach ($plans as &$plan) {
        $plan['incluye'] = normalizar_incluye($plan['incluye'] ?? '');
    }
    unset($plan);

    $stmtTestimonials = $pdo->query("
        SELECT 
            id, 
            nombre, 
            rol AS cargo, 
            cita AS texto, 
            orden
        FROM site_testimonials
        WHERE activo = 1
        ORDER BY orden ASC, id ASC
    ");
    $testimonials = $stmtTestimonials->fetchAll();

    $stmtMedia = $pdo->query("
        SELECT id, tipo, url, nombre_archivo, mime_type, tamanio_bytes
        FROM hero_media
        WHERE activo = 1
        ORDER BY id DESC
        LIMIT 1
    ");
    $heroMedia = $stmtMedia->fetch();

    echo json_encode([
        'exito' => true,
        'data'  => [
            'config'       => $config,
            'features'     => $features,
            'plans'        => $plans,
            'testimonials' => $testimonials,
            'hero_media'   => $heroMedia ?: null
        ]
    ], JSON_UNESCAPED_UNICODE);
}

function normalizar_incluye(mixed $incluyeRaw): array
{
    if (is_array($incluyeRaw)) {
        $incluye = $incluyeRaw;
    } else {
        $incluyeRaw = trim((string)$incluyeRaw);
        $decoded = json_decode($incluyeRaw, true);

        if (is_array($decoded)) {
            $incluye = $decoded;
        } elseif ($incluyeRaw !== '') {
            $incluye = preg_split('/\r\n|\r|\n/', $incluyeRaw);
        } else {
            $incluye = [];
        }
    }

    return array_values(array_filter(
        array_map(
            static fn($item) => trim((string)$item),
            $incluye
        ),
        static fn($item) => $item !== ''
    ));
}