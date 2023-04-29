import React, { InputHTMLAttributes, ReactNode, useState } from 'react';
import { Label } from './styles';

interface FileInputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    icon?: ReactNode;
    register: any;
    errors?: any;
    disable?: boolean;
    buttonSize?: 'small' | 'medium' | 'large';
    buttonType?: 'primary' | 'secondary';
    padding?: string;
}

function FileInputGroup({
    name,
    label,
    register,
    errors,
    buttonSize = 'medium',
    buttonType = 'primary',
    padding,
    disable,
    ...props
}: FileInputGroupProps) {
    const [isSelected, setIsSelected] = useState('');
    function getFileName(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value) {
            setIsSelected('Arquivo selecionado!');
        }
    }
    return (
        <>
            <Label
                htmlFor={name}
                buttonSize={buttonSize}
                buttonType={buttonType}
                disabled={disable}
                padding={padding}
                {...register(name)}
            >
                {isSelected || label}
                <input
                    name={name}
                    id={name}
                    {...props}
                    disabled={disable}
                    type={disable ? 'hidden' : props.type}
                    onChange={(e) => getFileName(e)}
                />
            </Label>
            {errors && <span>{errors}</span>}
        </>
    );
}

export { FileInputGroup };
