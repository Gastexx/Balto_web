<?php
declare(strict_types=1);

ini_set('display_errors', '1');
error_reporting(E_ALL);

@date_default_timezone_set('America/Argentina/Cordoba');
mb_internal_encoding('UTF-8');

/* =========================
   CORS
========================= */
$allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? trim((string)$_SERVER['HTTP_ORIGIN']) : '';

if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Credentials: true');
    header('Vary: Origin');
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Content-Type: application/json; charset=utf-8');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

/* =========================
   DB
========================= */
require_once __DIR__ . '/../config/db.php';

/* =========================
   SESSION
========================= */
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

/* =========================
   HELPERS
========================= */
function json_response(array $data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function require_admin_session(): void
{
    if (
        !isset($_SESSION['admin_id']) ||
        (int)$_SESSION['admin_id'] <= 0
    ) {
        json_response([
            'exito' => false,
            'mensaje' => 'No autorizado.'
        ], 401);
    }
}

/* =========================
   ACTION
========================= */
$action = '';

if (isset($_GET['action'])) {
    $action = trim((string)$_GET['action']);
} elseif (isset($_POST['action'])) {
    $action = trim((string)$_POST['action']);
} elseif (isset($_REQUEST['action'])) {
    $action = trim((string)$_REQUEST['action']);
}

if ($action === '') {
    json_response([
        'exito' => false,
        'mensaje' => 'Falta parámetro action.'
    ], 400);
}

/* =========================
   RUTAS PÚBLICAS
========================= */
$PUBLIC_ACTIONS = [
    'login_admin',
    'logout_admin',
    'sesion_admin_actual',
    'web_home_obtener',
    'web_config_obtener',
    'web_features_listar',
    'web_planes_listar',
    'web_testimonials_listar',
    'web_hero_media_obtener',
];

/* =========================
   CARGA DE MÓDULOS
========================= */
require_once __DIR__ . '/../modules/login/route.php';
require_once __DIR__ . '/../modules/web_public/route.php';
require_once __DIR__ . '/../modules/web_admin/route.php';
require_once __DIR__ . '/../modules/admin/admin_planes.php';
require_once __DIR__ . '/../modules/uploads/route.php';

try {
    /* =========================
       RUTAS PÚBLICAS
    ========================= */
    if (in_array($action, $PUBLIC_ACTIONS, true)) {
        if (function_exists('route_login') && route_login($action, $pdo)) {
            exit;
        }

        if (function_exists('route_web_public') && route_web_public($action, $pdo)) {
            exit;
        }

        json_response([
            'exito' => false,
            'mensaje' => "Acción pública no válida: {$action}"
        ], 404);
    }

    /* =========================
       RUTAS PRIVADAS
    ========================= */
    require_admin_session();

    if (function_exists('route_login') && route_login($action, $pdo)) {
        exit;
    }

    if (function_exists('route_web_admin') && route_web_admin($action, $pdo)) {
        exit;
    }

    if (function_exists('route_admin_planes') && route_admin_planes($action, $pdo)) {
        exit;
    }

    if (function_exists('route_uploads') && route_uploads($action, $pdo)) {
        exit;
    }

    json_response([
        'exito' => false,
        'mensaje' => "Acción privada no válida: {$action}"
    ], 404);

} catch (Throwable $e) {
    json_response([
        'exito' => false,
        'mensaje' => 'Error en API: ' . $e->getMessage()
    ], 500);
}