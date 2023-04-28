import styled from 'styled-components';

interface TextStyles {
    size: 'small' | 'medium' | 'large';
    disabled?: boolean;
    isValid?: boolean;
    isInvalid?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isInputLabel?: boolean;
    isHidden?: boolean;
}

export const Label = styled.span<TextStyles>`
    font-style: normal;
    ${(props) => {
        if (props.isInputLabel) {
            return `font-weight: 600;`;
        } else {
            return `font-weight: 400;`;
        }
    }}
    ${(props) => {
        switch (props.size) {
            case 'small':
                return `
                font-size: 14px;
                line-height: 16px;
              `;
            case 'medium':
                return `
                font-size: 14px;
                line-height: 20px;
              `;
            case 'large':
                return `
                font-weight: 600;
                font-size: 16px;
                line-height: 24px;
              `;
        }
    }}
  ${(props) => {
        if (props.isDisabled) {
            return `color: color: var(--grey-300); opacity: 0.5;`;
        }
        if (props.isReadOnly) {
            return `color: color: var(--grey-300);`;
        }
        return `color: var(--dark-blue);`;
    }}
`;
