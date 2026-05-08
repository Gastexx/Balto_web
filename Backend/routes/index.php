<?php
declare(strict_types=1);

// Permite usar URL limpia:
// Local:      http://localhost:3001/routes?action=...
// Producción: https://balto.3devsnet.com/api/routes?action=...
//
// También sigue funcionando la URL anterior:
// http://localhost:3001/routes/api.php?action=...

require __DIR__ . '/api.php';
