import React, { ReactNode } from 'react';
import { Label } from './styles';

export interface TextProps {
    size?: 'small' | 'medium' | 'large';
    children: ReactNode;
    disabled?: boolean;
    isValid?: boolean;
    isInvalid?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isInputLabel?: boolean;
    isHidden?: boolean;
}

export function Text({ size = 'medium', children, ...props }: TextProps) {
    return (
        <Label size={size} {...props}>
            {children}
        </Label>
    );
}
