<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

include_once('connection.php');

try {
    $select = 'SELECT id, title, description FROM products ORDER BY id DESC';

    $result = $connect->prepare($select);
    $result->execute();

    if ($result->rowCount() > 0) {
        while ($product = $result->fetch(PDO::FETCH_ASSOC)) { //FETCH_ASSOC é utilizado porque retorna um array associativo
            extract($product); //extract desestrutura o array, permitindo que eu use cada associação dele como uma variável separada

            $list_products['records'][$id] = [
                'id' => $id,
                'title' => $title,
                'description' => $description
            ];
        }

        http_response_code(200); //repassa o status code como 200 (sucesso)

        echo json_encode($list_products);
    }
} catch (PDOException $e) {
    echo 'Houve um erro. Tente novamente mais tarde.';
}
