import React from 'react';

interface IProps {
    name: string;
    label: string;
    value: string;
    register: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Radio({ name, label, value, register, onChange }: IProps) {
    return (
        <div className="form-check">
            <input
                className="form-check-input"
                type="radio"
                value={value}
                {...register(name)}
                name={name}
                onChange={onChange}
            />
            <label className="form-check-label" htmlFor={name}>
                {label}
            </label>
        </div>
    );
}

export { Radio };
