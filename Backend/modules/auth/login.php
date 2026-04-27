<?php

function auth_login(PDO $pdo): void
{
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    $input = json_decode(file_get_contents("php://input"), true);

    $email = trim($input["email"] ?? "");
    $password = trim($input["password"] ?? "");

    if ($email === "" || $password === "") {
        echo json_encode([
            "exito" => false,
            "mensaje" => "Completá email y contraseña"
        ], JSON_UNESCAPED_UNICODE);
        return;
    }

    $sql = "SELECT idUsuario, Nombre_Completo, Email, Hash_Contrasena, rol
            FROM admin_users
            WHERE Email = :email
            LIMIT 1";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ":email" => $email
    ]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode([
            "exito" => false,
            "mensaje" => "Usuario o contraseña incorrectos"
        ], JSON_UNESCAPED_UNICODE);
        return;
    }

    if (!password_verify($password, $user["Hash_Contrasena"])) {
        echo json_encode([
            "exito" => false,
            "mensaje" => "Usuario o contraseña incorrectos"
        ], JSON_UNESCAPED_UNICODE);
        return;
    }

    $_SESSION["admin_id"] = (int)$user["idUsuario"];
    $_SESSION["admin_nombre"] = $user["Nombre_Completo"];
    $_SESSION["admin_email"] = $user["Email"];
    $_SESSION["admin_rol"] = $user["rol"];

    echo json_encode([
        "exito" => true,
        "mensaje" => "Login correcto",
        "data" => [
            "id" => (int)$user["idUsuario"],
            "nombre" => $user["Nombre_Completo"],
            "email" => $user["Email"],
            "rol" => $user["rol"]
        ]
    ], JSON_UNESCAPED_UNICODE);
}