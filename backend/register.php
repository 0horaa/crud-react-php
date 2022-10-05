<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Headers: *');
// header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE');

include_once('connection.php');

try {
    $response_json = file_get_contents('php://input'); //recebe os dados
    $data = json_decode($response_json, true); //com o 'true', retorna o conteúdo do JSON em formato de arrays associativos

    if ($data) {
        $insert = 'INSERT INTO products(title, description) VALUES(:title, :description)';
        $result = $connect->prepare($insert);

        $result->bindParam(':title', $data['product']['title'], PDO::PARAM_STR);
        $result->bindParam(':description', $data['product']['description'], PDO::PARAM_STR);

        $result->execute();

        if ($result->rowCount() > 0) {
            $response = [
                'error' => false,
                'message' => 'Produto cadastrado com sucesso!'
            ];
        } else {
            $response = [
                'error' => true,
                'message' => 'Não foi possível cadastrar o produto :('
            ];
        }
    } else {
        $response = [
            'error' => true,
            'message' => 'Não foi possível cadastrar o produto :('
        ];
    }

    http_response_code(200);
    echo json_encode($response);
} catch (PDOException $e) {
    echo json_encode($response = [
        'error' => true,
        'message' => 'Não foi possível cadastrar o produto :('
    ]);
}
