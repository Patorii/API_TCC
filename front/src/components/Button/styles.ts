import styled from 'styled-components';
import { darken } from 'polished';

interface IButtonProps {
    buttonSize?: string;
    buttonType?: string;
}

function converteTamanho(tamanho: string | undefined) {
    if (tamanho === 'large') {
        return '56px';
    }
    if (tamanho === 'small') {
        return '30px';
    } else {
        return '42px';
    }
}
function converteCorFundo(corEscolhida: string | undefined) {
    if (corEscolhida === 'secondary') {
        return 'var(--white)';
    }
    if (corEscolhida === 'warning') {
        return 'var(--yellow-600)';
    } else {
        return 'var(--cyan-100)';
    }
}
function converteCorEscrita(corEscolhida: string | undefined) {
    if (corEscolhida === 'secondary') {
        return 'var(--black)';
    }
    if (corEscolhida === 'warning') {
        return 'var(--brown-800)';
    } else {
        return 'var(--black)';
    }
}

export const Botao = styled.button<IButtonProps>`
    transition: background-color 0.2s;
    width: 100%;
    height: ${({ buttonSize }) => converteTamanho(buttonSize)};
    padding: 12px 16px 12px 16px;
    background: ${({ buttonType }) => converteCorFundo(buttonType)};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    border-radius: 10px;
    border: ${({ buttonType }) => {
        switch (buttonType) {
            case 'primary':
                return `none;`;
            case 'secondary':
                return `solid 1px ${converteCorEscrita(buttonType)};`;
            case 'warning':
                return `solid 1px ${converteCorEscrita(buttonType)};`;
        }
    }};

    &:hover {
        ${(props) => {
            switch (props.buttonType) {
                case 'primary':
                    return `background-color: ${darken(0.15, '#3ECFF0')} ;`;
                case 'secondary':
                    return `background-color: ${darken(0.15, '#ffffff')} ;`;
                case 'warning':
                    return `background-color: ${darken(0.1, '#FFAE11')} ;`;
            }
        }}
    }
`;

export const Span = styled.span<IButtonProps>`
    margin: ${({ buttonType }) =>
        buttonType === 'warning' ? '0px 8px' : '0px 12px;'};
    font-size: ${({ buttonType }) =>
        buttonType === 'warning' ? '20px' : '16px'};
    font-weight: 700;
    color: ${({ buttonType }) => converteCorEscrita(buttonType)};
`;
