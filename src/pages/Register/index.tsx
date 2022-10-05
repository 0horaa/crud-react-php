import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

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
    ButtonSubmit, 
} from './styles';

import { BASE_URL } from '../../utils/api.routes';

type ProductProps = {
    title: string;
    description: string;
}

type StatusProps = {
    type: string;
    message: string;
}

export function Register() {
    const navigate = useNavigate();
    const [product, setProduct] = useState<ProductProps>({} as ProductProps);
    const [status, setStatus] = useState<StatusProps>({} as StatusProps);

    async function registerProducts(event: FormEvent) {
        event.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/register.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({product})
            })
            const data = await response.json();
            
            if(data.error) {
                setStatus({
                    type: "error",
                    message: data.message //obtem a mensagem do response
                });
            } else {
                setStatus({
                    type: "success",
                    message: data.message
                });
            }
        } catch (error) {
            setStatus({
                type: "error",
                message: "Não foi possível se conectar ao servidor. Por favor, tente novamente mais tarde."
            });
        }
    }

    function handleNavigateToHome() {
        navigate("/");;
    }

    return (
        <Container>
            <HeaderContent>
                <Title text="Cadastro de produtos" />
                <ButtonInfo onClick={handleNavigateToHome}>Listar produtos</ButtonInfo>
            </HeaderContent>
            {status.type === "error" && <AlertDanger>{status.message}</AlertDanger>}
            {status.type === "success" && <AlertSuccess>{status.message}</AlertSuccess>}
            <Form onSubmit={registerProducts}>
                <LabelTitle htmlFor="title">Título: </LabelTitle>
                <Input 
                    type="text" 
                    name="title" 
                    id="title" 
                    placeholder="Título do Produto" 
                    onChange={event => setProduct({...product, title: event.target.value})}
                />

                <LabelDescription htmlFor="description">Descrição: </LabelDescription>
                <Textarea 
                    name="description" 
                    id="description" 
                    placeholder="Descrição do Produto"
                    onChange={event => setProduct({...product, description: event.target.value})}
                ></Textarea>
                
                <ButtonSubmit type="submit">Cadastrar</ButtonSubmit>
            </Form>
        </Container>
    );
}