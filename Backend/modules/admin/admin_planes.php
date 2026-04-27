<?php
declare(strict_types=1);

function route_admin_planes(string $action, PDO $pdo): bool
{
    switch ($action) {
        case 'admin_planes_guardar':
            $input = json_decode(file_get_contents('php://input'), true);
            $items = $input['items'] ?? null;

            if (!is_array($items)) {
                http_response_code(400);
                echo json_encode([
                    'exito' => false,
                    'mensaje' => 'Payload inválido. Se esperaba un array en items.'
                ], JSON_UNESCAPED_UNICODE);
                return true;
            }

            try {
                $pdo->beginTransaction();

                $pdo->exec("DELETE FROM planes_saas");

                $sql = "INSERT INTO planes_saas (nombre, precio, incluye, orden)
                        VALUES (:nombre, :precio, :incluye, :orden)";
                $stmt = $pdo->prepare($sql);

                foreach ($items as $index => $item) {
                    $nombre  = trim((string)($item['nombre'] ?? ''));
                    $precio  = trim((string)($item['precio'] ?? ''));
                    $incluye = trim((string)($item['incluye'] ?? ''));
                    $orden   = (int)($item['orden'] ?? ($index + 1));

                    if ($nombre === '') {
                        throw new RuntimeException('Todos los planes deben tener nombre.');
                    }

                    if ($precio === '') {
                        throw new RuntimeException('Todos los planes deben tener precio.');
                    }

                    $stmt->execute([
                        ':nombre'  => $nombre,
                        ':precio'  => $precio,
                        ':incluye' => $incluye,
                        ':orden'   => $orden,
                    ]);
                }

                $pdo->commit();

                $stmt = $pdo->query("
                    SELECT id, nombre, precio, incluye, orden
                    FROM planes_saas
                    ORDER BY orden ASC, id ASC
                ");
                $planes = $stmt->fetchAll(PDO::FETCH_ASSOC);

                echo json_encode([
                    'exito' => true,
                    'mensaje' => 'Planes guardados correctamente.',
                    'data' => $planes
                ], JSON_UNESCAPED_UNICODE);
                return true;

            } catch (Throwable $e) {
                if ($pdo->inTransaction()) {
                    $pdo->rollBack();
                }

                http_response_code(500);
                echo json_encode([
                    'exito' => false,
                    'mensaje' => 'No se pudieron guardar los planes.',
                    'error' => $e->getMessage()
                ], JSON_UNESCAPED_UNICODE);
                return true;
            }
    }

    return false;
}