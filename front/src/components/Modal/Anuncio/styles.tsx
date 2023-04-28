import styled from 'styled-components';

export const Container = styled.div`
    width: auto;
    background-color: var(--grey-blue);
    display: flex;
    flex-direction: row;
    gap: 12px;
`;

export const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 400px;
    padding: 24px;
`;

export const Image = styled.img`
    width: 100%;
    height: 400px;
`;
export const PetName = styled.p`
    font-size: 24px;
    font-weight: 800;
`;
