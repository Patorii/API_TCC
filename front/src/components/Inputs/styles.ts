import styled from 'styled-components'

interface IProps {
  textArea: boolean | undefined;
}

export const Container = styled.label<IProps>`
  display: block;
  font-family: Roboto;
  .input {
    outline: none;
    width: 348px;
    height: ${(props)=> props.textArea? '100%' : '34px'};
    background-color: var(--white);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 10px 16px;
    font-family: Roboto;
    font-size: 18px;

    :focus {
      border: 2px solid var(--brown-600);
    }

    ::placeholder {
      font-size: 14px;
      color: var(--brown-600);
      letter-spacing: 0.5px;
      font-family: Roboto;
    }

    @media (max-width: 450px) {
      width: 100%;
    }
  }

  .inputError {
    border: 1px solid red;
  }

  .error {
    color: red;
    font-size: 12px;
  }
`

export const Text = styled.span`
  display: block;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`
