import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEdit, FiEye, FiTrash2, FiTrash } from 'react-icons/fi';
import Modal from 'react-modal';

import { Title } from '../../components/Title';
import { ButtonInfo } from '../../components/ButtonInfo';

import { 
    Container, 
    HeaderContent, 
    Table, 
    AlertDanger, 
    AlertSuccess,
    ModalWrapper,
    IconModal,
    TitleModal,
    SubtitleModal,
    ButtonsModal,
    CancelButton,
    ConfirmButton, 
    customStyles,
    Loader
} from './styles'; 
import '../../styles/icons.css';

import { BASE_URL } from '../../utils/api.routes';

type DataProps = {
    id: number;
    title: string;
    description: string;
}

type StatusProps = {
    type: string;
    message: string;
}

export function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState<DataProps[]>([]);
    const [status, setStatus] = useState<StatusProps>({} as StatusProps);
    const [productId, setProductId] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [thereIsLoading, setThereIsLoading] = useState(false);
    Modal.setAppElement("#root");

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    async function getProducts() {
        try {
            setThereIsLoading(true);

            const response = await fetch(`${BASE_URL}/index.php`)
            const data = await response.json()

            setData(data.records)
            setThereIsLoading(false);
        } catch(error) {
            setData([]);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    async function deleteProduct(id: number) {
        try {
            const response = await fetch(`${BASE_URL}/delete.php?id=${id}`)
            const data = await response.json()

            if(data.error) {
                setStatus({
                    type: "error",
                    message: data.message
                });
            } else {
                setStatus({
                    type: "success",
                    message: data.message
                });
                getProducts();
            }
        } catch (error) {
            setStatus({
                type: "error",
                message: "Não foi possível se conectar ao servidor. Por favor, tente novamente mais tarde."
            });
        }        
    }

    function handleNavigateToRegister() {
        navigate("/register");
    }

    return (
        <Container id="container">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Modal de confirmação de exclusão do produto"
                closeTimeoutMS={300}
                style={customStyles}
            >
                <ModalWrapper>
                    <IconModal>
                        <FiTrash />
                    </IconModal>
                    <TitleModal>
                        Excluir produto
                    </TitleModal>
                    <SubtitleModal>
                        Tem certeza de que você deseja excluir este produto?
                    </SubtitleModal>
                    <ButtonsModal>
                        <CancelButton onClick={closeModal}>Cancelar</CancelButton>
                        <ConfirmButton 
                            onClick={() => {
                                deleteProduct(productId);
                                closeModal();
                            }}
                        >
                            Sim, excluir
                        </ConfirmButton>
                    </ButtonsModal>
                </ModalWrapper>
            </Modal>
            <HeaderContent>
                <Title text="Listagem de produtos" />
                <ButtonInfo onClick={handleNavigateToRegister}>Cadastrar produtos</ButtonInfo>
            </HeaderContent>
            {status.type === "error" && <AlertDanger>{status.message}</AlertDanger>}
            {status.type === "success" && <AlertSuccess>{status.message}</AlertSuccess>}

            {thereIsLoading
                ? <Loader />

                : <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Título</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td className="icons-wrapper">
                                    <Link to={`/read/${product.id}`} title="Visualizar" >
                                        <span><FiEye className="view-icon" /></span>
                                    </Link>
                                    <Link to={`/update/${product.id}`} title="Editar">
                                        <span><FiEdit className="edit-icon" /></span>
                                    </Link>
                                    <span 
                                        onClick={() => {
                                            setProductId(product.id);
                                            openModal();
                                        }} 
                                        title="Deletar"
                                    >
                                        <FiTrash2 className="delete-icon" />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
            
        </Container>
    );
}