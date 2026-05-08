<?php
declare(strict_types=1);

function normalizar_incluye_plan(mixed $incluyeRaw): array
{
    if (is_array($incluyeRaw)) {
        $items = $incluyeRaw;
    } else {
        $texto = trim((string)$incluyeRaw);
        $json = json_decode($texto, true);

        if (is_array($json)) {
            $items = $json;
        } elseif ($texto !== '') {
            $items = preg_split('/\r\n|\r|\n/', $texto) ?: [];
        } else {
            $items = [];
        }
    }

    return array_values(array_filter(
        array_map(static fn($item) => trim((string)$item), $items),
        static fn($item) => $item !== ''
    ));
}

function obtener_planes_saas(PDO $pdo, bool $soloActivos = true): array
{
    $where = $soloActivos ? 'WHERE activo = 1' : '';

    $stmt = $pdo->query(
        "SELECT id, nombre, precio, nota, descripcion, incluye, destacado, orden, activo
         FROM planes_saas
         {$where}
         ORDER BY orden ASC, id ASC"
    );

    $planes = $stmt->fetchAll();

    foreach ($planes as &$plan) {
        $plan['id'] = (int)$plan['id'];
        $plan['orden'] = (int)($plan['orden'] ?? 0);
        $plan['destacado'] = (int)($plan['destacado'] ?? 0);
        $plan['activo'] = (int)($plan['activo'] ?? 1);
        $plan['incluye'] = normalizar_incluye_plan($plan['incluye'] ?? '');
    }
    unset($plan);

    return $planes;
}

function admin_planes_guardar(PDO $pdo): void
{
    $input = json_decode(file_get_contents('php://input'), true);

    if (!is_array($input)) {
        $input = [];
    }

    $items = $input['items'] ?? null;

    if (!is_array($items)) {
        http_response_code(400);
        echo json_encode([
            'exito' => false,
            'mensaje' => 'Payload inválido. Se esperaba un array en items.',
        ], JSON_UNESCAPED_UNICODE);
        return;
    }

    try {
        $pdo->beginTransaction();

        $pdo->exec('DELETE FROM planes_saas');

        $stmt = $pdo->prepare(
            "INSERT INTO planes_saas
                (nombre, precio, nota, descripcion, incluye, destacado, orden, activo)
             VALUES
                (:nombre, :precio, :nota, :descripcion, :incluye, :destacado, :orden, 1)"
        );

        foreach ($items as $index => $item) {
            if (!is_array($item)) {
                continue;
            }

            $nombre = trim((string)($item['nombre'] ?? ''));
            $precio = trim((string)($item['precio'] ?? ''));
            $incluye = $item['incluye'] ?? '';
            $orden = (int)($item['orden'] ?? ($index + 1));

            if ($nombre === '') {
                throw new RuntimeException('Todos los planes deben tener nombre.');
            }

            if ($precio === '') {
                throw new RuntimeException('Todos los planes deben tener precio.');
            }

            if (is_array($incluye)) {
                $incluye = implode("\n", normalizar_incluye_plan($incluye));
            } else {
                $incluye = implode("\n", normalizar_incluye_plan((string)$incluye));
            }

            $stmt->execute([
                ':nombre' => $nombre,
                ':precio' => $precio,
                ':nota' => trim((string)($item['nota'] ?? '')) ?: null,
                ':descripcion' => trim((string)($item['descripcion'] ?? '')) ?: null,
                ':incluye' => $incluye,
                ':destacado' => !empty($item['destacado']) ? 1 : 0,
                ':orden' => $orden > 0 ? $orden : ($index + 1),
            ]);
        }

        $pdo->commit();

        echo json_encode([
            'exito' => true,
            'mensaje' => 'Planes guardados correctamente.',
            'data' => obtener_planes_saas($pdo, true),
        ], JSON_UNESCAPED_UNICODE);
    } catch (Throwable $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }

        http_response_code(500);
        echo json_encode([
            'exito' => false,
            'mensaje' => 'No se pudieron guardar los planes.',
            'error' => $e->getMessage(),
        ], JSON_UNESCAPED_UNICODE);
    }
}
