<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

include_once('connection.php');

$id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);

try {
    $delete = 'DELETE FROM products WHERE id=:id LIMIT 1';
    $result = $connect->prepare($delete);

    $result->bindParam(':id', $id, PDO::PARAM_INT);

    $result->execute();

    if ($result->rowCount() > 0) {
        $response = [
            'error' => false,
            'message' => 'Produto apagado com sucesso!'
        ];
    } else {
        $response = [
            'error' => true,
            'message' => 'Não foi possível apagar o produto :('
        ];
    }

    http_response_code(200);
    echo json_encode($response);
} catch (PDOException $e) {
    echo json_encode($response = [
        'error' => true,
        'message' => 'Não foi possível apagar o produto :('
    ]);
}
