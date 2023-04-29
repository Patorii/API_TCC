import React, { InputHTMLAttributes, ReactNode } from 'react';
import {
    Container,
    Icon,
    Hint,
    InvalidIcon,
    ValidIcon,
    Textarea,
} from './styles';

export interface TextAreaRootProps
    extends InputHTMLAttributes<HTMLTextAreaElement> {
    children: ReactNode;
    isInvalid?: boolean;
}

function TextAreaRoot({
    children,
    isInvalid = false,
    readOnly,
}: TextAreaRootProps) {
    return (
        <Container isReadOnly={readOnly} isInvalid={isInvalid}>
            {children}
        </Container>
    );
}

TextAreaRoot.displayName = 'TextArea.Root';

export interface TextAreaValidIconProps {
    children: ReactNode;
}

function TextAreaValidIcon({ children }: TextAreaValidIconProps) {
    return <ValidIcon>{children}</ValidIcon>;
}

TextAreaValidIcon.displayName = 'TextArea.ValidIcon';

export interface TextAreaInvalidIconProps {
    children: ReactNode;
}

function TextAreaInvalidIcon({ children }: TextAreaInvalidIconProps) {
    return <InvalidIcon>{children}</InvalidIcon>;
}

TextAreaInvalidIcon.displayName = 'TextArea.InvalidIcon';

export interface TextAreaIconProps {
    children: ReactNode;
}

function TextAreaIcon({ children }: TextAreaIconProps) {
    return <Icon>{children}</Icon>;
}

TextAreaIcon.displayName = 'TextArea.Icon';

export interface TextAreaInputProps
    extends InputHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    register: any;
}

function TextAreaInput({ register, name, ...props }: TextAreaInputProps) {
    return <Textarea {...props} {...register(name)} />;
}

TextAreaInput.displayName = 'TextArea.Input';

export type TextAreaSingleInputProps = InputHTMLAttributes<HTMLTextAreaElement>;

function TextAreaSingleInput({ ...props }: TextAreaSingleInputProps) {
    return <Textarea {...props} />;
}

TextAreaSingleInput.displayName = 'TextArea.SingleInput';

export interface TextAreaHintProps {
    message: string;
    isInvalid?: boolean;
}

function TextAreaHint({ message, isInvalid = false }: TextAreaHintProps) {
    return (
        <Hint isInvalid={isInvalid}>
            <span>{message}</span>
        </Hint>
    );
}

TextAreaHint.displayName = 'TextArea.Hint';

export interface TextAreaErrorProps {
    message: string;
}

function TextAreaError({ message }: TextAreaErrorProps) {
    return (
        <Hint isInvalid>
            <span>{message}</span>
        </Hint>
    );
}

TextAreaError.displayName = 'TextArea.Error';

export const TextArea = {
    Root: TextAreaRoot,
    Input: TextAreaInput,
    SingleInput: TextAreaSingleInput,
    Icon: TextAreaIcon,
    Error: TextAreaError,
    InvalidIcon: TextAreaInvalidIcon,
    ValidIcon: TextAreaValidIcon,
    Hint: TextAreaHint,
};
