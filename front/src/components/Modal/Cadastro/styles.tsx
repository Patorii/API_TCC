import styled from 'styled-components';

export const Container = styled.div`
    width: 500px;

    background-color: var(--grey-blue);
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 0px 32px;
`;

export const InputArea = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    min-width: 260px;
`;

export const LoginBtnArea = styled.div`
    width: auto;
    margin-bottom: 12px;
`;
export const RegisterBtnArea = styled.div`
    margin-top: -12px;
    width: auto;
`;

export const ErrorText = styled.p`
    margin-top: -12px;
    color: var(--red);
    font-size: 14px;
    line-height: 20px;
`;

export const RadiosArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    height: 42px;
`;

export const RadioTitle = styled.p`
    font-size: 16px;
    font-weight: 600;
`;

export const RadiosDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    gap: 16px;
`;
