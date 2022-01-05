import { ButtonHTMLAttributes } from 'react';
import { Wrapper } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ButtonInfo(props: ButtonProps) {
    return (
        <Wrapper 
            {...props}
        />
    );
}