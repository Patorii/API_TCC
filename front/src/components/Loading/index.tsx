import React from 'react';
import { TailSpin } from 'react-loader-spinner';

interface ILoaderProps {
    height?: string;
    width?: string;
    color?: string;
    ariaLabel?: string;
    radius?: string;
    visible?: boolean;
    wrapperClass?: string;
}

function Loader({
    height = '80',
    width = '80',
    color = 'var(--dark-blue)',
    ariaLabel = 'tail-spin-loading',
    radius = '1',
    visible = true,
    wrapperClass = 'spin',
}: ILoaderProps) {
    return (
        <TailSpin
            height={height}
            width={width}
            color={color}
            ariaLabel={ariaLabel}
            radius={radius}
            visible={visible}
            wrapperClass={wrapperClass}
        />
    );
}

export { Loader };
