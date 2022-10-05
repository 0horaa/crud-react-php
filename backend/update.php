<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Headers: *');

include_once('connection.php');

try {
    $response_json = file_get_contents('php://input');
    $data = json_decode($response_json, true);

    if ($data) {
        $update = 'UPDATE products SET title=:title, description=:description WHERE id=:id';
        $result = $connect->prepare($update);

        $result->bindParam(':title', $data['product']['title'], PDO::PARAM_STR);
        $result->bindParam(':description', $data['product']['description'], PDO::PARAM_STR);
        $result->bindParam(':id', $data['product']['id'], PDO::PARAM_INT);

        $result->execute();

        if ($result->rowCount() > 0) {
            $response = [
                'error' => false,
                'message' => 'Produto atualizado com sucesso!',
                'data' => $data
            ];
        } else {
            $response = [
                'error' => true,
                'message' => 'Não foi possível atualizar o produto :('
            ];
        }
    } else {
        $response = [
            'error' => true,
            'message' => 'Não foi possível atualizar o produto :('
        ];
    }

    http_response_code(200);
    echo json_encode($response);
} catch (PDOException $e) {
    echo json_encode($response = [
        'error' => true,
        'message' => 'Não foi possível atualizar o produto :('
    ]);
}
