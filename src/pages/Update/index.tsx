import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Title } from '../../components/Title';
import { ButtonInfo } from '../../components/ButtonInfo';

import { 
    Container, 
    HeaderContent,
    AlertSuccess,
    AlertDanger,
    Form,
    LabelTitle,
    LabelDescription,
    Input,
    Textarea,
    ButtonSubmit
} from './styles';

import { BASE_URL } from '../../utils/api.routes';

type Params = {
    id: string;
}

type ProductProps = {
    id: number;
    title: string;
    description: string;
}

type StatusProps = {
    type: string;
    message: string;
}

export function Update() {
    const navigate = useNavigate();
    const params = useParams<Params>();
    const id = params.id;
    const [product, setProduct] = useState<ProductProps>({} as ProductProps);
    const [status, setStatus] = useState<StatusProps>({} as StatusProps);

    useEffect(() => {
        async function getProduct() {
            await fetch(`${BASE_URL}/read.php?id=${id}`)
            .then(response => response.json())
            .then(responseToJSON => {
                setProduct(responseToJSON.product);
            });
        }

        getProduct();
    }, [id])

    async function updateProducts(event: FormEvent) {
        event.preventDefault();
    
        await fetch(`${BASE_URL}/update.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({product})
        }).then(response => response.json()).then(responseToJSON => {
            console.log(responseToJSON);
            if(responseToJSON.error) {
                setStatus({
                    type: "error",
                    message: responseToJSON.message
                });
            } else {
                setStatus({
                    type: "success",
                    message: responseToJSON.message
                });
            }
        }).catch(() => {
            setStatus({
                type: "error",
                message: "Não foi possível se conectar ao servidor. Por favor, tente novamente mais tarde."
            });
        })
    }

    function handleNavigateToHome() {
        navigate("/");
    }

    return (
        <Container>
            <HeaderContent>
                <Title text="Edição do produto" />
                <ButtonInfo onClick={handleNavigateToHome}>Listar produtos</ButtonInfo>
            </HeaderContent>
            {status.type === "error" && <AlertDanger>{status.message}</AlertDanger>}
            {status.type === "success" && <AlertSuccess>{status.message}</AlertSuccess>}
            <Form onSubmit={updateProducts}>
                <LabelTitle htmlFor="title">Título: </LabelTitle>
                <Input 
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Título do produto"
                    value={product.title || ""}
                    onChange={event => setProduct({...product, title: event.target.value})}
                />
                {/*
                    as aspas no value são para evitar que no primeiro render do componente o value seja setado
                    como 'undefined', isso porque o data começa como um objeto vazio antes de receber os dados
                    da API
                */}

                <LabelDescription htmlFor="description">Descrição: </LabelDescription>
                <Textarea
                    name="description"
                    id="description"
                    placeholder="Descrição do produto"
                    value={product.description || ""} 
                    onChange={event => setProduct({...product, description: event.target.value})}
                ></Textarea>

                <ButtonSubmit type="submit">Atualizar</ButtonSubmit>
            </Form>
        </Container>
    ); 
}