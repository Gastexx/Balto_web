<?php
declare(strict_types=1);

function web_admin_json_input(): array
{
    $input = json_decode(file_get_contents('php://input'), true);
    return is_array($input) ? $input : [];
}

function web_admin_config_guardar(PDO $pdo): void
{
    $input = web_admin_json_input();
    $items = $input['items'] ?? [];

    if (!is_array($items) || count($items) === 0) {
        http_response_code(400);
        echo json_encode([
            'exito' => false,
            'mensaje' => 'No se recibieron items para guardar.'
        ], JSON_UNESCAPED_UNICODE);
        return;
    }

    try {
        $pdo->beginTransaction();

        $sql = "INSERT INTO site_config (clave, valor, tipo)
                VALUES (:clave, :valor, :tipo)
                ON DUPLICATE KEY UPDATE
                  valor = VALUES(valor),
                  tipo = VALUES(tipo)";
        $stmt = $pdo->prepare($sql);

        foreach ($items as $item) {
            $clave = trim((string)($item['clave'] ?? ''));
            $valor = (string)($item['valor'] ?? '');
            $tipo  = trim((string)($item['tipo'] ?? 'text'));

            if ($clave === '') {
                continue;
            }

            $stmt->execute([
                ':clave' => $clave,
                ':valor' => $valor,
                ':tipo'  => $tipo !== '' ? $tipo : 'text',
            ]);
        }

        $pdo->commit();

        echo json_encode([
            'exito' => true,
            'mensaje' => 'Configuración guardada correctamente.'
        ], JSON_UNESCAPED_UNICODE);
    } catch (Throwable $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }

        http_response_code(500);
        echo json_encode([
            'exito' => false,
            'mensaje' => 'No se pudo guardar la configuración.',
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

function web_admin_features_guardar(PDO $pdo): void
{
    $input = web_admin_json_input();
    $items = $input['items'] ?? [];

    if (!is_array($items)) {
        http_response_code(400);
        echo json_encode([
            'exito' => false,
            'mensaje' => 'Payload inválido. Se esperaba un array en items.'
        ], JSON_UNESCAPED_UNICODE);
        return;
    }

    try {
        $pdo->beginTransaction();

        $pdo->exec("DELETE FROM site_features");

        $stmt = $pdo->prepare("INSERT INTO site_features (titulo, texto, orden, activo)
                               VALUES (:titulo, :texto, :orden, :activo)");

        foreach ($items as $index => $item) {
            $titulo = trim((string)($item['titulo'] ?? ''));
            $texto  = trim((string)($item['texto'] ?? ''));
            $orden  = (int)($item['orden'] ?? ($index + 1));
            $activo = isset($item['activo']) ? (int)$item['activo'] : 1;

            if ($titulo === '' && $texto === '') {
                continue;
            }

            $stmt->execute([
                ':titulo' => $titulo,
                ':texto'  => $texto,
                ':orden'  => $orden,
                ':activo' => $activo,
            ]);
        }

        $pdo->commit();

        echo json_encode([
            'exito' => true,
            'mensaje' => 'Features guardadas correctamente.'
        ], JSON_UNESCAPED_UNICODE);
    } catch (Throwable $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }

        http_response_code(500);
        echo json_encode([
            'exito' => false,
            'mensaje' => 'No se pudieron guardar las features.',
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

function web_admin_testimonials_guardar(PDO $pdo): void
{
    $input = web_admin_json_input();
    $items = $input['items'] ?? [];

    if (!is_array($items)) {
        http_response_code(400);
        echo json_encode([
            'exito' => false,
            'mensaje' => 'Payload inválido. Se esperaba un array en items.'
        ], JSON_UNESCAPED_UNICODE);
        return;
    }

    try {
        $pdo->beginTransaction();

        $pdo->exec("DELETE FROM site_testimonials");

        $stmt = $pdo->prepare("INSERT INTO site_testimonials (nombre, rol, cita, orden, activo)
                               VALUES (:nombre, :rol, :cita, :orden, :activo)");

        foreach ($items as $index => $item) {
            $nombre = trim((string)($item['nombre'] ?? ''));
            $rol    = trim((string)($item['rol'] ?? ''));
            $texto  = trim((string)($item['texto'] ?? ''));
            $orden  = (int)($item['orden'] ?? ($index + 1));
            $activo = isset($item['activo']) ? (int)$item['activo'] : 1;

            if ($nombre === '' && $texto === '' && $rol === '') {
                continue;
            }

            $stmt->execute([
                ':nombre' => $nombre,
                ':rol'    => $rol,
                ':cita'   => $texto,
                ':orden'  => $orden,
                ':activo' => $activo,
            ]);
        }

        $pdo->commit();

        echo json_encode([
            'exito' => true,
            'mensaje' => 'Testimonios guardados correctamente.'
        ], JSON_UNESCAPED_UNICODE);
    } catch (Throwable $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }

        http_response_code(500);
        echo json_encode([
            'exito' => false,
            'mensaje' => 'No se pudieron guardar los testimonios.',
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}