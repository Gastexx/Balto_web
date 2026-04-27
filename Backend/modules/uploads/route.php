<?php
declare(strict_types=1);

function route_uploads(string $action, PDO $pdo): bool
{
    switch ($action) {
        case 'hero_media_listar':
            $stmt = $pdo->query("SELECT id, tipo, url, nombre_archivo, mime_type, tamanio_bytes, activo
                                 FROM hero_media
                                 ORDER BY id DESC");
            $rows = $stmt->fetchAll();

            echo json_encode([
                'exito' => true,
                'data' => $rows
            ], JSON_UNESCAPED_UNICODE);
            return true;
    }

    return false;
}