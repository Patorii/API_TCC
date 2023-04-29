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
    if (corEscolhida === 'tertiary') {
        return 'var(--dark-blue)';
    } else {
        return 'var(--cyan-100)';
    }
}
function converteCorEscrita(corEscolhida: string | undefined) {
    if (corEscolhida === 'secondary') {
        return 'var(--dark-blue)';
    }
    if (corEscolhida === 'tertiary') {
        return 'var(--grey-blue)';
    } else {
        return 'var(--dark-blue)';
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
            case 'tertiary':
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
                case 'tertiary':
                    return `
                    background-color: var(--white);
                    border: solid 1px var(--dark-blue);
                    `;
            }
        }}
    }
    &:hover > span {
        ${(props) =>
            props.buttonType === 'tertiary' ? 'color: var(--dark-blue);' : ''}
    }
`;

export const Span = styled.span<IButtonProps>`
    font-weight: 700;
    color: ${({ buttonType }) => converteCorEscrita(buttonType)};
`;
