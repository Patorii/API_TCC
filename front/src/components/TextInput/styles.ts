import styled from 'styled-components';

interface InputTextStyles {
    isInvalid?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isValid?: boolean;
    textTransform?: string;
}

export const Container = styled.div<InputTextStyles>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    width: 100%;
    height: 42px;
    border: 1px solid;
    border-radius: 10px;
    ${(props) => {
        if (props.isReadOnly) {
            return `border-color: var(--grey-300);
               background: var(--grey-300);`;
        } else {
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
        }
    }}
    &:focus-within {
        border-color: var(--cyan-100);
        background: var(--white);
    }
    & > input {
        background: transparent;
        color: var(--dark-blue);
        font-weight: 500;
        line-height: 24px;
        font-size: 14px;
        border: none;
        height: 100%;
        width: 100%;
        text-transform: ${(props) => props.textTransform};
        &:internal-autofill-selected {
            background: transparent;
        }
        &:focus {
            border: none;
            outline: none;
        }
        ::placeholder {
            text-transform: none;
            color: var(--blue-bootstrap);
            opacity: 0.8;
        }
        &:disabled {
            opacity: 0.5;
        }
        &:read-only {
            color: var(--black);
        }
    }
`;

export const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    & > svg {
        width: 18px;
        height: 18px;
        color: var(--grey-100);
    }
`;

export const ValidIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    & > svg {
        width: 18px;
        height: 18px;
        color: var(--blue-bootstrap);
    }
`;

export const InvalidIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    & > svg {
        width: 18px;
        height: 18px;
        color: var(--red);
    }
`;

export const Hint = styled.div<InputTextStyles>`
    & > span {
        height: 16px;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        ${(props) => {
            if (props.isValid) {
                return `color: var(--blue-bootstrap);`;
            }
            if (props.isInvalid) {
                return `color: var(--red);`;
            }
            if (props.isDisabled) {
                return `color: var(--grey-300); opacity: 0.5;`;
            }
            if (props.isReadOnly) {
                return `color: var(--grey-300);`;
            }
            return `color: var(--blue-bootstrap);`;
        }}
    }
`;
