import React, { InputHTMLAttributes, ReactNode } from 'react';
import { Container, Icon, Hint, InvalidIcon, ValidIcon } from './styles';

export interface TextInputRootProps
    extends InputHTMLAttributes<HTMLInputElement> {
    children: ReactNode;
    isInvalid?: boolean;
    textTransform?: string;
}

function TextInputRoot({
    children,
    isInvalid = false,
    readOnly,
    textTransform = 'uppercase',
    ...props
}: TextInputRootProps) {
    return (
        <Container
            isReadOnly={readOnly}
            textTransform={textTransform}
            {...props}
            isInvalid={isInvalid}
        >
            {children}
        </Container>
    );
}

TextInputRoot.displayName = 'TextInput.Root';

export interface TextInputValidIconProps {
    children: ReactNode;
}

function TextInputValidIcon({ children }: TextInputValidIconProps) {
    return <ValidIcon>{children}</ValidIcon>;
}

TextInputValidIcon.displayName = 'TextInput.ValidIcon';

export interface TextInputInvalidIconProps {
    children: ReactNode;
}

function TextInputInvalidIcon({ children }: TextInputInvalidIconProps) {
    return <InvalidIcon>{children}</InvalidIcon>;
}

TextInputInvalidIcon.displayName = 'TextInput.InvalidIcon';

export interface TextInputIconProps {
    children: ReactNode;
}

function TextInputIcon({ children }: TextInputIconProps) {
    return <Icon>{children}</Icon>;
}

TextInputIcon.displayName = 'TextInput.Icon';

export interface TextInputInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    register: any;
}

function TextInputInput({ register, name, ...props }: TextInputInputProps) {
    return <input {...props} {...register(name)} />;
}

TextInputInput.displayName = 'TextInput.Input';

export type TextInputSingleInputProps = InputHTMLAttributes<HTMLInputElement>;

function TextInputSingleInput({ ...props }: TextInputSingleInputProps) {
    return <input {...props} />;
}

TextInputSingleInput.displayName = 'TextInput.SingleInput';

export interface TextInputHintProps {
    message: string;
    isInvalid?: boolean;
}

function TextInputHint({ message, isInvalid = false }: TextInputHintProps) {
    return (
        <Hint isInvalid={isInvalid}>
            <span>{message}</span>
        </Hint>
    );
}

TextInputHint.displayName = 'TextInput.Hint';

export interface TextInputErrorProps {
    message: string;
}

function TextInputError({ message }: TextInputErrorProps) {
    return (
        <Hint isInvalid>
            <span>{message}</span>
        </Hint>
    );
}

TextInputError.displayName = 'TextInput.Error';

export const TextInput = {
    Root: TextInputRoot,
    Input: TextInputInput,
    SingleInput: TextInputSingleInput,
    Icon: TextInputIcon,
    Error: TextInputError,
    InvalidIcon: TextInputInvalidIcon,
    ValidIcon: TextInputValidIcon,
    Hint: TextInputHint,
};
