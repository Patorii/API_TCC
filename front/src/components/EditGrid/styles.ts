import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 20px;
`;

export const GridArea = styled.div`
    display: grid;
    width: auto;
    grid-template-columns: repeat(5, 250px);
    grid-template-rows: 340px 340px;
    grid-auto-flow: row;
    grid-gap: 40px;
    @media (max-width: 1745px) {
        grid-template-columns: repeat(4, 250px);
    }
    @media (max-width: 1440px) {
        grid-template-columns: repeat(3, 250px);
    }
    @media (max-width: 1120px) {
        grid-template-columns: repeat(2, 250px);
    }
    @media (max-width: 860px) {
        grid-template-columns: repeat(1, 250px);
    }
`;

export const Card = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 250px;
    height: 340px;
    padding: 16px 16px 4px 16px;
    background: var(--dark-blue);
    border-radius: 10px;
    cursor: pointer;
    user-select: none;
    transition: 0.5s transform;
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.4);

    &:hover {
        transform: scale(1.05);
    }
    &:hover > img {
        transform: scale(1.02);
    }
`;

export const CardImage = styled.img`
    position: relative;
    width: 100%;
    height: 160px;
    border-radius: 10px;
    transition: 0.5s transform;
`;

export const CardTitle = styled.p`
    font-weight: 700;
    font-size: 18px;
    color: var(--white);
    margin: 0px;
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
