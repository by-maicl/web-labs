<?php
header('Content-Type: application/json');

$inputJSON = file_get_contents('php://input');
$inputData = json_decode($inputJSON, true);

if (!empty($inputData) && isset($inputData['text']) && isset($inputData['count'])) {
    
    $dbFile = 'database.json';
    
    $record = [
        'id' => uniqid(),
        'text' => htmlspecialchars($inputData['text']),
        'count' => (int)$inputData['count'],
        'timestamp' => date('Y-m-d H:i:s')
    ];

    $currentData = [];
    if (file_exists($dbFile)) {
        $fileContent = file_get_contents($dbFile);
        $currentData = json_decode($fileContent, true) ?? [];
    }

    $currentData[] = $record;

    if (file_put_contents($dbFile, json_encode($currentData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        echo json_encode(['status' => 'success', 'message' => 'Дані успішно збережено!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Помилка запису файлу. Перевірте права доступу.']);
    }

} else {
    echo json_encode(['status' => 'error', 'message' => 'Некоректні дані']);
}
?>