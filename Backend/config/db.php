<?php
declare(strict_types=1);

// backend/config/db.php

// Configuración de la base de datos
// Ejecutar servidor:
// php -S localhost:3001 -c "C:\PHP\php1\php.ini"

$host = 'localhost';
$dbname = 'balto_web'; // 👈 IMPORTANTE (tu nueva DB)
$user = 'root';
$pass = 'Gastex2233'; // tu contraseña

try {
    $pdo = new PDO(
        "mysql:host={$host};dbname={$dbname};charset=utf8mb4",
        $user,
        $pass
    );

    // Configuración recomendada
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');

    echo json_encode([
        'exito' => false,
        'mensaje' => 'Error de conexión a la base de datos: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);

    exit;
}