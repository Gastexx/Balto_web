<?php
declare(strict_types=1);

// backend/config/db.php
// Ejecutar local:
// php -S localhost:3001 -t backend

$host = 'localhost';
$dbname = 'balto_web';
$user = 'root';
$pass = 'Gastex2233';

try {
    $pdo = new PDO(
        "mysql:host={$host};dbname={$dbname};charset=utf8mb4",
        $user,
        $pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');

    echo json_encode([
        'exito' => false,
        'mensaje' => 'Error de conexión a la base de datos.',
        'error' => $e->getMessage(),
    ], JSON_UNESCAPED_UNICODE);

    exit;
}
