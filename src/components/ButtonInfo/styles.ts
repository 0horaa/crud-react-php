import styled from 'styled-components';

export const Wrapper = styled.button`
    background-color: transparent;
    color: #17a2b8;
    padding: 1%;
    font-size: 110%;
    border: 1px solid #17a2b8;
    border-radius: 8px;
    cursor: pointer;
    transition: color .15s ease-in-out, background-color .15s ease-in-out;

    :hover, :focus {
        background-color: #17a2b8;
        color: #fff;
    }
`;