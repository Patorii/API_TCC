import styled from 'styled-components';

interface InputTextStyles {
    isInvalid?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isValid?: boolean;
}

export const Container = styled.div<InputTextStyles>`
    display: flex;
    gap: 8px;
    padding: 8px;
    border: 1px solid;
    border-radius: 10px;
    width: 100%;
    height: 100%;
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
        font-size: 14px;
        line-height: 21px;
        border: none;
        height: 100%;
        width: 100%;

        &:internal-autofill-selected {
            background: transparent;
        }

        &:focus {
            border: none;
            outline: none;
        }

        &:placeholder {
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
        width: 24px;
        height: 24px;
        color: var(--grey-100);
    }
`;

export const ValidIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    & > svg {
        width: 24px;
        height: 24px;
        color: var(--blue-bootstrap);
    }
`;

export const InvalidIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    & > svg {
        width: 24px;
        height: 24px;
        color: var(--red);
    }
`;

export const Hint = styled.div<InputTextStyles>`
    & > span {
        height: 14px;
        font-weight: 600;
        font-size: 12px;
        line-height: 21px;

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

export const Textarea = styled.textarea`
    border: none;
    resize: none;
    background: transparent;
    width: 100%;
    height: 100%;
    &:focus {
        border: none;
        outline: none;
    }

    &:placeholder {
        color: var(--grey-100);
    }

    &:disabled {
        opacity: 0.5;
    }

    &:read-only {
        color: var(--black);
    }
`;
