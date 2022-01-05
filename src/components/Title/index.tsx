import { Wrapper } from './styles';

type Props = {
    text: string;
}

export function Title({text}: Props) {
    return (
        <Wrapper>{text}</Wrapper>
    );
}