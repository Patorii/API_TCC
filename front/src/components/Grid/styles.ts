import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

export const GridArea = styled.div`
    display: grid;
    width: auto;
    grid-template-columns: repeat(5, 300px);
    grid-template-rows: 250px 250px;
    grid-auto-flow: row;
    grid-gap: 40px;
`;
export const Card = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 300px;
    height: 250px;
    padding: 16px;
    background: var(--dark-blue);
    border-radius: 10px;
    cursor: pointer;
    user-select: none;
`;

export const CardImage = styled.img`
    position: relative;
    width: 100%;
    height: 160px;
    border-radius: 10px;
`;

export const CardTitle = styled.p`
    font-weight: 700;
    font-size: 18px;
    color: var(--white);
`;

export const CardAddressArea = styled.div`
    display: flex;
    gap: 4px;
`;

export const CardState = styled.p`
    font-size: 14px;
    color: var(--white);
`;

export const CardCity = styled.p`
    font-size: 14px;
    color: var(--white);
    text-transform: capitalize;
`;
