import React, { InputHTMLAttributes, ReactNode } from 'react';
import { CheckCircle, XCircle } from 'phosphor-react';
import { TextArea } from '../../TextArea';
import { Text } from '../../Text';

interface TextAreaGroupProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label?: string;
    hint?: string;
    icon?: ReactNode;
    register: any;
    errors?: any;
    isInvalid?: boolean;
    isValid?: boolean;
    disable?: boolean;
}

function TextAreaGroup({
    name,
    label,
    hint = '',
    icon,
    register,
    errors,
    isInvalid,
    isValid,
    readOnly,
    disable,
    ...props
}: TextAreaGroupProps) {
    return (
        <label style={{ width: '100%', height: '100%' }} htmlFor={name}>
            <Text
                isReadOnly={readOnly}
                isInputLabel
                isInvalid={!!errors}
                isDisabled={disable}
            >
                {label}
            </Text>
            <TextArea.Root isInvalid={!!errors} readOnly={readOnly}>
                {icon && <TextArea.Icon>{icon}</TextArea.Icon>}
                <TextArea.Input
                    id={name}
                    register={register}
                    name={name}
                    {...props}
                    readOnly={readOnly}
                    hidden={disable}
                />
                {isInvalid && (
                    <TextArea.InvalidIcon>
                        <XCircle weight="fill" />
                    </TextArea.InvalidIcon>
                )}
                {isValid && (
                    <TextArea.ValidIcon>
                        <CheckCircle weight="fill" />
                    </TextArea.ValidIcon>
                )}
            </TextArea.Root>
            {hint !== '' && (
                <TextArea.Hint message={hint} isInvalid={!!errors} />
            )}
            {errors && <TextArea.Error message={errors?.message || ''} />}
        </label>
    );
}

export { TextAreaGroup };
