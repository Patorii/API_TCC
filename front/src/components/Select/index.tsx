import React from 'react';

import { Select, Placeholder, Container, Option } from './styles';

export interface ISelectItems {
    description: string;
    value: string | number;
}
interface ISelect {
    name: string;
    register: any;
    selectItems: Array<ISelectItems>;
    placeholder?: string;
    isInvalid?: boolean;
    isValid?: boolean;
    value?: string | number | readonly string[];
    onSelect?(e: any): void;
    textTransform?: string;
}

function SelectInput({
    value,
    register,
    selectItems,
    isInvalid,
    isValid,
    name,
    placeholder,
    onSelect,
    textTransform,
    ...props
}: ISelect) {
    return (
        <Container isInvalid={isInvalid} isValid={isValid}>
            <Select
                name={name}
                defaultValue={value || -1}
                {...register(name)}
                onChange={(e: HTMLSelectElement) => onSelect && onSelect(e)}
                {...props}
                textTransform={textTransform}
            >
                {placeholder ? (
                    <Placeholder value={-1} textTransform={textTransform}>
                        {placeholder}
                    </Placeholder>
                ) : (
                    <></>
                )}
                {selectItems.map((item: ISelectItems, i) => (
                    <Option
                        key={i}
                        value={item.value}
                        textTransform={textTransform}
                    >
                        {item.description}
                    </Option>
                ))}
            </Select>
        </Container>
    );
}

export { SelectInput };
