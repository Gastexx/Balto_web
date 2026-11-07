<?php
declare(strict_types=1);

/*
 * Planes SaaS de la web pública.
 *
 * Cada plan pertenece a un sistema (columna `planes_saas.sistema`):
 *   - 'servicios' → pestaña "BALTO Servicios"
 *   - 'comercio'  → pestaña "BALTO Comercio"
 *
 * Requiere la migración sql/migracion_planes_sistema.sql.
 */

const PLANES_SISTEMAS = ['servicios', 'comercio'];

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

/**
 * Devuelve el sistema normalizado o null si el valor no es válido.
 */
function normalizar_sistema_plan(mixed $valor): ?string
{
    $sistema = strtolower(trim((string)$valor));

    return in_array($sistema, PLANES_SISTEMAS, true) ? $sistema : null;
}

/**
 * Solo para clientes antiguos que no envían `sistema`: deduce la categoría
 * por el nombre. Los datos guardados siempre quedan con el campo explícito.
 */
function inferir_sistema_plan_legacy(string $nombre): string
{
    return stripos($nombre, 'comercio') !== false ? 'comercio' : 'servicios';
}

function obtener_planes_saas(PDO $pdo, bool $soloActivos = true, ?string $sistema = null): array
{
    $condiciones = [];
    $params = [];

    if ($soloActivos) {
        $condiciones[] = 'activo = 1';
    }

    if ($sistema !== null) {
        $condiciones[] = 'sistema = :sistema';
        $params[':sistema'] = $sistema;
    }

    $where = $condiciones ? 'WHERE ' . implode(' AND ', $condiciones) : '';

    $stmt = $pdo->prepare(
        "SELECT id, sistema, nombre, precio, nota, descripcion, incluye, destacado, orden, activo
         FROM planes_saas
         {$where}
         ORDER BY sistema DESC, orden ASC, id ASC"
    );
    $stmt->execute($params);

    $planes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($planes as &$plan) {
        $plan['id'] = (int)$plan['id'];
        $plan['sistema'] = normalizar_sistema_plan($plan['sistema'] ?? '') ?? 'servicios';
        $plan['orden'] = (int)($plan['orden'] ?? 0);
        $plan['destacado'] = (int)($plan['destacado'] ?? 0);
        $plan['activo'] = (int)($plan['activo'] ?? 1);
        $plan['incluye'] = normalizar_incluye_plan($plan['incluye'] ?? '');
    }
    unset($plan);

    return $planes;
}

/**
 * Guarda los planes.
 *
 * Payload esperado:
 *   {
 *     "sistema": "servicios" | "comercio",
 *     "items": [
 *       { "id": 12, "nombre": "...", "precio": "95.000", "descripcion": "...",
 *         "nota": "...", "incluye": "a\nb" | ["a","b"], "destacado": 0|1, "orden": 1 }
 *     ]
 *   }
 *
 * - Solo se modifican los planes del `sistema` indicado: los de la otra
 *   categoría nunca se tocan.
 * - Los ítems con `id` existente se actualizan (se conserva el id); los ítems
 *   sin id se insertan; los planes del sistema que no vengan en `items` se
 *   eliminan.
 * - Compatibilidad: si no se envía `sistema` (cliente anterior), se toma el
 *   `sistema` de cada ítem (o se infiere por nombre) y el alcance es la tabla
 *   completa, como hacía la versión anterior.
 */
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

    $sistemaScope = null;

    if (array_key_exists('sistema', $input)) {
        $sistemaScope = normalizar_sistema_plan($input['sistema']);

        if ($sistemaScope === null) {
            http_response_code(400);
            echo json_encode([
                'exito' => false,
                'mensaje' => 'Sistema inválido. Valores permitidos: ' . implode(', ', PLANES_SISTEMAS) . '.',
            ], JSON_UNESCAPED_UNICODE);
            return;
        }
    }

    try {
        $pdo->beginTransaction();

        // Planes existentes dentro del alcance (id => sistema).
        if ($sistemaScope !== null) {
            $stmtExistentes = $pdo->prepare('SELECT id, sistema FROM planes_saas WHERE sistema = :sistema');
            $stmtExistentes->execute([':sistema' => $sistemaScope]);
        } else {
            $stmtExistentes = $pdo->query('SELECT id, sistema FROM planes_saas');
        }

        $existentes = [];
        foreach ($stmtExistentes->fetchAll(PDO::FETCH_ASSOC) as $row) {
            $existentes[(int)$row['id']] = (string)$row['sistema'];
        }

        $stmtInsert = $pdo->prepare(
            "INSERT INTO planes_saas
                (sistema, nombre, precio, nota, descripcion, incluye, destacado, orden, activo)
             VALUES
                (:sistema, :nombre, :precio, :nota, :descripcion, :incluye, :destacado, :orden, 1)"
        );

        $stmtUpdate = $pdo->prepare(
            "UPDATE planes_saas
             SET sistema = :sistema,
                 nombre = :nombre,
                 precio = :precio,
                 nota = :nota,
                 descripcion = :descripcion,
                 incluye = :incluye,
                 destacado = :destacado,
                 orden = :orden,
                 activo = 1
             WHERE id = :id"
        );

        $idsConservados = [];
        $nombresPorSistema = [];

        foreach (array_values($items) as $index => $item) {
            if (!is_array($item)) {
                continue;
            }

            $nombre = trim((string)($item['nombre'] ?? ''));
            $precio = trim((string)($item['precio'] ?? ''));
            $orden = (int)($item['orden'] ?? ($index + 1));

            if ($nombre === '') {
                throw new InvalidArgumentException('Todos los planes deben tener nombre.');
            }

            if ($precio === '') {
                throw new InvalidArgumentException("El plan \"{$nombre}\" debe tener precio.");
            }

            if ($sistemaScope !== null) {
                $sistema = $sistemaScope;
            } else {
                $sistema = normalizar_sistema_plan($item['sistema'] ?? '')
                    ?? inferir_sistema_plan_legacy($nombre);
            }

            $claveNombre = $sistema . '|' . mb_strtolower($nombre);
            if (isset($nombresPorSistema[$claveNombre])) {
                throw new InvalidArgumentException("Hay dos planes llamados \"{$nombre}\" en la misma categoría.");
            }
            $nombresPorSistema[$claveNombre] = true;

            $nota = trim((string)($item['nota'] ?? ''));
            if (mb_strlen($nota) > 80) {
                throw new InvalidArgumentException("La nota del plan \"{$nombre}\" supera los 80 caracteres.");
            }

            $params = [
                ':sistema' => $sistema,
                ':nombre' => $nombre,
                ':precio' => $precio,
                ':nota' => $nota !== '' ? $nota : null,
                ':descripcion' => trim((string)($item['descripcion'] ?? '')) ?: null,
                ':incluye' => implode("\n", normalizar_incluye_plan($item['incluye'] ?? '')),
                ':destacado' => !empty($item['destacado']) ? 1 : 0,
                ':orden' => $orden > 0 ? $orden : ($index + 1),
            ];

            $id = isset($item['id']) && is_numeric($item['id']) ? (int)$item['id'] : 0;

            if ($id > 0) {
                if (!array_key_exists($id, $existentes)) {
                    // El id no pertenece a esta categoría (o ya no existe):
                    // nunca se pisa un plan de la otra pestaña.
                    throw new InvalidArgumentException("El plan \"{$nombre}\" (id {$id}) no pertenece a la categoría que se está guardando.");
                }

                if (isset($idsConservados[$id])) {
                    throw new InvalidArgumentException("El plan con id {$id} está repetido.");
                }

                $stmtUpdate->execute($params + [':id' => $id]);
                $idsConservados[$id] = true;
            } else {
                $stmtInsert->execute($params);
            }
        }

        // Eliminar solo los planes del alcance que ya no vienen en el payload.
        $idsAEliminar = array_diff(array_keys($existentes), array_keys($idsConservados));

        if ($idsAEliminar) {
            $placeholders = implode(',', array_fill(0, count($idsAEliminar), '?'));
            $stmtDelete = $pdo->prepare("DELETE FROM planes_saas WHERE id IN ({$placeholders})");
            $stmtDelete->execute(array_values($idsAEliminar));
        }

        $pdo->commit();

        echo json_encode([
            'exito' => true,
            'mensaje' => 'Planes guardados correctamente.',
            'sistema' => $sistemaScope,
            // Se devuelven todos los planes activos (ambas categorías) para
            // que el cliente pueda refrescar solo la que guardó.
            'data' => obtener_planes_saas($pdo, true),
        ], JSON_UNESCAPED_UNICODE);
    } catch (Throwable $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }

        $esValidacion = $e instanceof InvalidArgumentException;

        http_response_code($esValidacion ? 422 : 500);
        echo json_encode([
            'exito' => false,
            'mensaje' => $esValidacion ? $e->getMessage() : 'No se pudieron guardar los planes.',
            'error' => $e->getMessage(),
        ], JSON_UNESCAPED_UNICODE);
    }
}
