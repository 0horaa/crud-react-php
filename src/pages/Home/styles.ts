import styled from 'styled-components';

export const Container = styled.div`
    margin: 2%;
    box-shadow: 0 0 8px #6c757d;
    padding: 2% 3%;
`;

export const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
`;

export const Table = styled.table`
    width: 100%;
    th {
        background-color: #0275d8;
        color: #f8f8f8;
        padding: 1%;
    }
    td {
        background-color: #f6f6f6;
        color: #3e3e3e;
        padding: 0.8%;
        text-align: center;
    }
`;

export const AlertSuccess = styled.p`
    background-color: #5cb85c;
    color: #f8f8f8;
    padding: 1%;
    border-radius: 8px;
    margin-bottom: 2%;
`;

export const AlertDanger = styled.p`
    background-color: #d9534f;
    color: #f8f8f8;
    padding: 1%;
    border-radius: 8px;
    margin-bottom: 2%;
`;

export const ModalWrapper = styled.div`
    text-align: center;
`;

export const IconModal = styled.span`
    svg {
        font-size: 300%;
        color: #d9534f;
    }
`;

export const TitleModal = styled.h2`
    color: #29292E;
    font-weight: bolder;
    margin-top: 1.5rem;
`;

export const SubtitleModal = styled.p`
    color: #737380;
    font-size: 105%;
    margin-top: 1rem;
`;

export const ButtonsModal = styled.div`
    margin-top: 2rem;

    button {
        padding: 0.8rem 1.5rem;
        margin: 0 0.5rem;
        font-size: 105%;
        cursor: pointer;
        border-radius: 8px;
        border: none;
        transition: filter .2s ease-in-out;
    }
    button:hover {
        filter: brightness(0.85);
    }
`;

export const CancelButton = styled.button`
    color: #737380;
    background-color: #DBDCDD;
`;

export const ConfirmButton = styled.button`
    color: #f8f8f8;
    background-color: #d9534f;
`;

export const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '40%',
      border: 'none',
      borderRadius: 8
    },
};