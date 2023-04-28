import React, { ReactNode, SelectHTMLAttributes } from 'react';
import { TextInput } from '../../TextInput';
import { Text } from '../../Text';
import { ISelectItems, SelectInput } from '../../Select';

interface ISelectGroupProps extends SelectHTMLAttributes<HTMLSelectElement> {
    selectItems: Array<ISelectItems>;
    name: string;
    label: string;
    hint?: string;
    icon?: ReactNode;
    placeholder?: string;
    register: any;
    errors?: any;
}

function SelectGroup({
    placeholder,
    selectItems,
    name,
    label,
    register,
    errors,
    hint,
    ...props
}: ISelectGroupProps) {
    return (
        <label htmlFor={name}>
            {label !== '' && (
                <Text isInputLabel isInvalid={!!errors}>
                    {label}
                </Text>
            )}
            <SelectInput
                name={name}
                placeholder={placeholder}
                selectItems={selectItems}
                register={register}
                isInvalid={!!errors}
                {...props}
            />
            {hint && <TextInput.Hint message={hint} isInvalid={!!errors} />}
            {errors && <TextInput.Error message={errors?.message || ''} />}
        </label>
    );
}

export { SelectGroup };
