import styled from 'styled-components';

export const Container = styled.div`
    display: relative;
    padding: 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: var(--grey-blue);
    border-radius: 10px;
`;
export const Xdiv = styled.div`
    position: absolute;
    top: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    user-select: none;
`;
