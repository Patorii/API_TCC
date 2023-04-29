import { darken } from 'polished';
import styled from 'styled-components';

interface LabelStyles {
    buttonSize: 'small' | 'medium' | 'large';
    buttonType: 'primary' | 'secondary';
    disabled?: boolean;
    padding?: string;
}

export const Label = styled.label<LabelStyles>`
    input[type='file'] {
        display: none;
        width: 100%;
    }
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    outline: none;
    font-weight: 400;
    font-style: normal;
    cursor: pointer;
    border-radius: 10px;

    ${(props) => {
        switch (props.buttonSize) {
            case 'small':
                return `
                  font-size: 14px;
                  line-height: 16px;
                  padding: 16px 32px;
                  height: 30px;
                `;
            case 'medium':
                return `
                  font-size: 16px;
                  line-height: 20px;
                  padding: 14px 32px;
                  height: 42px;
                `;
            case 'large':
                return `
                  font-size: 18px;
                  line-height: 24px;
                  padding: 8px 24px;
                  height: 56px;
                `;
        }
    }}
    ${(props) => props.padding && `padding: ${props.padding};`}
    gap: 8px;
    width: 100%;

    border-radius: ${(props) => props.theme.buttonBorderRadius};

    ${(props) => {
        if (props.disabled) {
            return `
            color: ${props.theme.palette.primaryButton.textDisabled};
            background: ${props.theme.palette.primaryButton.disabled};
            border: 0;
            cursor: not-allowed;

            >label{
               cursor: not-allowed;
            }
            `;
        }

        switch (props.buttonType) {
            case 'primary':
                return `
                    color: var(--dark-blue);
                    background: var(--cyan-100);
                    border: none;

                    &:hover{
                        background-color: ${darken(0.15, '#3ECFF0')};
                    }
                `;

            case 'secondary':
                return `
                    color: var(--dark-blue);
                    background: var(--white);
                    border: 1px solid var(--blue-bootstrap);
                    };

                    &:hover{
                        border: 1px solid var(--cyan-100);
                        background-color: ${darken(0.1, '#ffffff')};
                    }
                `;
        }
    }}
`;
