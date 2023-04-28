import styled from 'styled-components';
interface IButtonProps {
    width?: string;
}
export const Container = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    background: var(--dark-blue);
    padding: 16px 32px;
`;

export const IconArea = styled.div`
    width: 48px;
    height: 48px;
    cursor: pointer;
    user-select: none;
`;

export const ButtonsArea = styled.div<IButtonProps>`
    height: 42px;
    width: ${({ width }) => width || '102px'};
`;
export const ButtonsAreaSigned = styled.div`
    display: flex;
    gap: 12px;
    height: 42px;
`;
