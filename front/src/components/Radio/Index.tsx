import React from 'react';

interface IProps {
    name: string;
    label: string;
    value: string;
    register: any;
}

function Radio({ name, label, value, register }: IProps) {
    return (
        <div className="form-check">
            <input
                className="form-check-input"
                type="radio"
                value={value}
                {...register(name)}
                id="flexCheckIndeterminate"
                name={name}
            />
            <label className="form-check-label" htmlFor={name}>
                {label}
            </label>
        </div>
    );
}

export { Radio };
