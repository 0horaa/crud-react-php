<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

include_once('connection.php');

$id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);

try {
    $select = 'SELECT id, title, description FROM products WHERE id=:id LIMIT 1'; //LIMIT 1 diz que apenas um registro será retornado
    $result = $connect->prepare($select);

    $result->bindParam(':id', $id, PDO::PARAM_INT);

    $result->execute();

    if($result->rowCount() > 0) {
        $product = $result->fetch(PDO::FETCH_ASSOC);

        $response = [
            'error' => false,
            'product' => $product
        ];
    } else {
        $response = [
            'error' => true,
            'message' => 'Nenhum produto foi encontrado :('
        ];
    }

    http_response_code(200);
    echo json_encode($response);

} catch(PDOException $e) {
    echo json_encode($response = [
        'error' => true,
        'message' => 'Nenhum produto foi encontrado :('
    ]);
}