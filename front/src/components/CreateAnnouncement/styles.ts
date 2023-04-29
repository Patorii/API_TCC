import styled from 'styled-components';

interface IInputAreaProps {
    width?: string;
    minWidth?: string;
}

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 16px;
`;

export const Form = styled.form`
    width: 800px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const InputLine = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
`;
export const InputColumn = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`;

export const RadiosArea = styled.div`
    width: 40%;
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

export const InputArea = styled.div<IInputAreaProps>`
    display: flex;
    gap: 8px;
    width: ${({ width }) => (width ? width : '45%')};
    min-width: ${({ minWidth }) => (minWidth ? minWidth : '150px')};
`;

export const TexAreaDiv = styled.div`
    width: 100%;
    height: 120px;
    margin-bottom: 24px;
`;

export const SubmitBtnArea = styled.div``;
