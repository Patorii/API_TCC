import React, { InputHTMLAttributes, ReactNode } from 'react';
import { CheckCircle, XCircle } from 'phosphor-react';

import { TextInput } from '../../TextInput';
import { Text } from '../../Text';

interface TextInputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    hint?: string;
    icon?: ReactNode;
    register: any;
    errors?: any;
    isInvalid?: boolean;
    isValid?: boolean;
    onBlur?: (e: any) => void;
    onChange?: (e: any) => void;
    disable?: boolean;
    textTransform?: string;
}

function TextInputGroup({
    name,
    label,
    hint = '',
    icon,
    register,
    errors,
    isInvalid,
    isValid,
    readOnly,
    onBlur,
    onChange,
    disable,
    textTransform,
    ...props
}: TextInputGroupProps) {
    return (
        <label style={{ width: '100%' }} htmlFor={name}>
            <Text
                isReadOnly={readOnly}
                isInputLabel
                isInvalid={!!errors}
                isDisabled={disable}
            >
                {label}
            </Text>

            <TextInput.Root
                isInvalid={!!errors}
                readOnly={readOnly}
                onChange={onChange}
                onBlur={onBlur}
                textTransform={textTransform}
            >
                {icon && <TextInput.Icon>{icon}</TextInput.Icon>}
                <TextInput.Input
                    id={name}
                    register={register}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...props}
                    readOnly={readOnly}
                    type={disable ? 'hidden' : props.type}
                />
                {isInvalid && (
                    <TextInput.InvalidIcon>
                        <XCircle weight="fill" />
                    </TextInput.InvalidIcon>
                )}
                {isValid && (
                    <TextInput.ValidIcon>
                        <CheckCircle weight="fill" />
                    </TextInput.ValidIcon>
                )}
            </TextInput.Root>

            {hint !== '' && (
                <TextInput.Hint message={hint} isInvalid={!!errors} />
            )}
            {errors && <TextInput.Error message={errors?.message || ''} />}
        </label>
    );
}

export { TextInputGroup };
