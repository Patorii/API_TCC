import React from 'react';
import { Botao, Span } from './styles';
import { Loader } from '../Loading';

// OBS: o Atributo buttonSize altera apenas a altura do botão, a largura é controlada pela div onde o botão for criado.
// Sempre envolva o botão com uma div para definir sua largura corretamente.
interface IButtonProps {
    caption?: string;
    buttonSize?: 'small' | 'medium' | 'large';
    buttonType?: 'primary' | 'secondary' | 'warning';
    buttonKind?: 'button' | 'submit';
    disabled?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick?: (e?: any) => void;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    loading?: boolean;
    hint?: string;
}

function Button({
    caption,
    buttonType,
    buttonSize,
    buttonKind,
    disabled,
    leftIcon,
    rightIcon,
    onClick,
    hint,
    loading,
}: IButtonProps) {
    return (
        <>
            {loading ? (
                <Botao
                    type={buttonKind || 'button'}
                    title={hint && hint}
                    buttonType={buttonType}
                    buttonSize={buttonSize}
                    onClick={onClick}
                    disabled={!!disabled}
                >
                    <Loader width="32px" height="32px" />
                </Botao>
            ) : (
                <Botao
                    type={buttonKind || 'button'}
                    title={hint && hint}
                    buttonType={buttonType}
                    buttonSize={buttonSize}
                    onClick={onClick}
                    disabled={!!disabled}
                >
                    {leftIcon && leftIcon}
                    {caption ? (
                        <Span buttonType={buttonType}>{caption}</Span>
                    ) : (
                        ''
                    )}
                    {rightIcon && rightIcon}
                </Botao>
            )}
        </>
    );
}

export { Button };
