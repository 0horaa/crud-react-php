import styled from 'styled-components';

export const Container = styled.section`
    max-width: 960px;
    margin: 2% auto;
    box-shadow: 0 0 8px #6c757d;
    padding: 2% 3%;
`;

export const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
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

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const LabelTitle = styled.label`
    margin: 1% 0;
    font-weight: bold;
    font-size: 110%;
    color: #3e3e3e;
`;

export const LabelDescription = styled.label`
    margin-bottom: 1%;
    margin-top: 4%;
    font-weight: bold;
    font-size: 110%;
    color: #3e3e3e;
`;

export const Input = styled.input`
    font-size: 105%;
    padding: 1%;
    border: 1px solid #ccc;
    border-radius: 8px;
    color: #3e3e3e;
`;

export const Textarea = styled.textarea`
    resize: vertical;
    min-height: 5rem;
    max-height: 15rem;
    font-size: 105%;
    padding: 1%;
    border: 1px solid #ccc;
    border-radius: 8px;
    color: #3e3e3e;
`;

export const ButtonSubmit = styled.button`
    background-color: transparent;
    color: #007bff;
    margin-top: 2%;
    padding: 1%;
    font-size: 110%;
    border: 1px solid #007bff;
    border-radius: 8px;
    cursor: pointer;
    transition: color .15s ease-in-out, background-color .15s ease-in-out;

    :hover, :focus {
        background-color: #007bff;
        color: #fff;
    }
`;