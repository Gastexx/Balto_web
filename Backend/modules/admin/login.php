<?php
declare(strict_types=1);

function admin_login(PDO $pdo): void
{
    $input = json_decode(file_get_contents('php://input'), true);

    if (!is_array($input)) {
        $input = [];
    }

    $usuario = trim((string)($input['usuario'] ?? $_POST['usuario'] ?? ''));
    $password = (string)($input['password'] ?? $_POST['password'] ?? '');

    if ($usuario === '' || $password === '') {
        http_response_code(400);
        echo json_encode([
            'exito' => false,
            'mensaje' => 'Usuario y contraseña son obligatorios.',
        ], JSON_UNESCAPED_UNICODE);
        return;
    }

    $stmt = $pdo->prepare(
        "SELECT idUsuario, Nombre_Completo, usuario, Hash_Contrasena, rol
         FROM admin_users
         WHERE usuario = :usuario
         LIMIT 1"
    );

    $stmt->execute([':usuario' => $usuario]);
    $admin = $stmt->fetch();

    if (!$admin || !password_verify($password, (string)$admin['Hash_Contrasena'])) {
        http_response_code(401);
        echo json_encode([
            'exito' => false,
            'mensaje' => 'Credenciales inválidas.',
        ], JSON_UNESCAPED_UNICODE);
        return;
    }

    session_regenerate_id(true);

    $_SESSION['admin_id'] = (int)$admin['idUsuario'];
    $_SESSION['admin_nombre'] = (string)$admin['Nombre_Completo'];
    $_SESSION['admin_usuario'] = (string)$admin['usuario'];
    $_SESSION['admin_rol'] = (string)$admin['rol'];

    echo json_encode([
        'exito' => true,
        'mensaje' => 'Login correcto.',
        'admin' => [
            'id' => (int)$admin['idUsuario'],
            'nombre' => (string)$admin['Nombre_Completo'],
            'usuario' => (string)$admin['usuario'],
            'rol' => (string)$admin['rol'],
        ],
    ], JSON_UNESCAPED_UNICODE);
}

function admin_logout(): void
{
    $_SESSION = [];

    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params['path'],
            $params['domain'],
            $params['secure'],
            $params['httponly']
        );
    }

    session_destroy();

    echo json_encode([
        'exito' => true,
        'mensaje' => 'Sesión cerrada.',
    ], JSON_UNESCAPED_UNICODE);
}

function admin_session_actual(): void
{
    if (!isset($_SESSION['admin_id']) || (int)$_SESSION['admin_id'] <= 0) {
        http_response_code(401);
        echo json_encode([
            'exito' => false,
            'mensaje' => 'No hay sesión activa.',
        ], JSON_UNESCAPED_UNICODE);
        return;
    }

    echo json_encode([
        'exito' => true,
        'admin' => [
            'id' => (int)$_SESSION['admin_id'],
            'nombre' => (string)($_SESSION['admin_nombre'] ?? ''),
            'usuario' => (string)($_SESSION['admin_usuario'] ?? ''),
            'rol' => (string)($_SESSION['admin_rol'] ?? 'admin'),
        ],
    ], JSON_UNESCAPED_UNICODE);
}
