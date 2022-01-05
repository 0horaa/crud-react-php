import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 

import { Title } from '../../components/Title';
import { ButtonInfo } from '../../components/ButtonInfo';

import { Container, HeaderContent, TextBold, ProductContent } from './styles';

import { BASE_URL } from '../../utils/api.routes';

type Params = {
    id: string;
}

type DataProps = {
    id: number;
    title: string;
    description: string;
}

export function Read() {
    const navigate = useNavigate();
    const params = useParams<Params>();
    const id = params.id;
    const [data, setData] = useState<DataProps>({} as DataProps);

    useEffect(() => {
        async function getProduct() {
            await fetch(`${BASE_URL}/read.php?id=${id}`)
            .then(response => response.json())
            .then(responseToJSON => {
                setData(responseToJSON.product);
            });
        }

        getProduct();
    }, [id]);

    function handleNavigateToHome() {
        navigate("/");
    }

    return (
        <Container>
            <HeaderContent>
                <Title text="Visualização do produto" />
                <ButtonInfo onClick={handleNavigateToHome}>Listar produtos</ButtonInfo>
            </HeaderContent>
            <ProductContent>
                <TextBold>ID:</TextBold> {data.id}
            </ProductContent>
            <ProductContent>
                <TextBold>Título:</TextBold> {data.title
            }</ProductContent>
            <ProductContent>
                <TextBold>Descrição:</TextBold> {data.description}
            </ProductContent>
        </Container>
    );
}