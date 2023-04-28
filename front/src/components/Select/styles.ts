import styled from 'styled-components';

interface ISelectProps {
    isInvalid?: boolean;
    isValid?: boolean;
    isPlaceholder?: boolean;
    textTransform?: string;
}

export const Container = styled.div<ISelectProps>`
    height: 42px;
    width: 100%;
    position: relative;
    color: var(--dark-blue);
    border: 1px solid;
    border-color: var(--blue-bootstrap);
    border-radius: 10px;
    background-color: var(--white);
    &:focus-within {
        border-color: var(--cyan-100);
        background: var(--white);
    }
    &:after {
        content: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 15L7.757 10.757L9.172 9.34302L12 12.172L14.828 9.34302L16.243 10.757L12 15Z' fill='%23132746'/%3E%3C/svg%3E%0A");
        right: 11px;
        /*Adjust for position however you want*/
        top: 6px;
        position: absolute;
        pointer-events: none;
    }
    ${(props) => {
        if (props.isInvalid) {
            return `border-color: var(--red);
                 background: var(--white);`;
        } else {
            if (props.isValid) {
                return `border-color: var(--blue-bootstrap);
                          background: var(--white);`;
            } else {
                return `border-color: var(--blue-bootstrap);
                    background: var(--white);`;
            }
        }
    }}
    cursor: pointer;
`;

export const Select = styled.select<ISelectProps>`
    height: 100%;
    width: 100%;
    padding: 0px 8px;
    font-weight: 500;
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    color: var(--dark-blue);
    background: transparent;
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari and Chrome */
    appearance: none;
    border: none;
    outline: none;
    text-transform: ${(props) => props.textTransform};
    select::-ms-expand {
        display: none;
    }
`;

export const Option = styled.option<ISelectProps>`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: var(--white);
    border: none;
    font-weight: 500;
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    text-transform: ${(props) => props.textTransform};
`;

export const Placeholder = styled.option<ISelectProps>`
    background-color: var(--white);
    font-size: 14px;
    color: var(--grey-300);
    font-weight: 500;
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    text-transform: ${(props) => props.textTransform};
`;
