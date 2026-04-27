<?php

function check_admin(): void
{
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    if (empty($_SESSION["admin_id"])) {
        echo json_encode([
            "exito" => false,
            "mensaje" => "No autorizado"
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}