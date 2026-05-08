<?php
declare(strict_types=1);

ini_set('display_errors', '1');
error_reporting(E_ALL);

@date_default_timezone_set('America/Argentina/Cordoba');
if (function_exists('mb_internal_encoding')) {
    mb_internal_encoding('UTF-8');
}

/* =========================
   CORS
========================= */
$allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
    'https://balto.com.ar',
    'https://www.balto.com.ar',
    'https://balto.3devsnet.com',
    'https://www.balto.3devsnet.com',
    'https://baltoadmin.3devsnet.com',
    'https://panel.balto.com.ar',
    'https://app.balto.com.ar',
    'https://admin.balto.com.ar',
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? trim((string)$_SERVER['HTTP_ORIGIN']) : '';

$originPermitido = false;

if ($origin !== '') {
    $originPermitido = in_array($origin, $allowedOrigins, true)
        || (bool)preg_match('/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/', $origin);
}

if ($origin !== '' && $originPermitido) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Credentials: true');
    header('Vary: Origin');
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Session, X-CSRF-Token, X-Tenant-ID, Accept');
header('Access-Control-Max-Age: 86400');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

/* =========================
   DB + SESSION
========================= */
require_once __DIR__ . '/../config/db.php';

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
    if (!isset($_SESSION['admin_id']) || (int)$_SESSION['admin_id'] <= 0) {
        json_response([
            'exito' => false,
            'mensaje' => 'No autorizado.',
        ], 401);
    }
}

/* =========================
   ACTION
========================= */
$action = trim((string)(
    $_GET['action']
    ?? $_POST['action']
    ?? $_REQUEST['action']
    ?? ''
));

if ($action === '') {
    json_response([
        'exito' => false,
        'mensaje' => 'Falta parámetro action.',
    ], 400);
}

/* =========================
   MÓDULOS ACTIVOS
========================= */
require_once __DIR__ . '/../modules/admin/route.php';
require_once __DIR__ . '/../modules/web/route.php';

$PUBLIC_ACTIONS = [
    'login_admin',
    'logout_admin',
    'sesion_admin_actual',
    'web_home_obtener',
    'web_planes_listar',
];

try {
    if (in_array($action, $PUBLIC_ACTIONS, true)) {
        if (route_admin($action, $pdo) || route_web($action, $pdo)) {
            exit;
        }

        json_response([
            'exito' => false,
            'mensaje' => "Acción pública no válida: {$action}",
        ], 404);
    }

    require_admin_session();

    if (route_admin($action, $pdo)) {
        exit;
    }

    json_response([
        'exito' => false,
        'mensaje' => "Acción privada no válida: {$action}",
    ], 404);
} catch (Throwable $e) {
    json_response([
        'exito' => false,
        'mensaje' => 'Error en API: ' . $e->getMessage(),
    ], 500);
}
