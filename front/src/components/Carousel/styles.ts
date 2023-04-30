import styled from 'styled-components';

export const Container = styled.div`
    width: 400px;
    height: 350px;
    @media (max-width: 420px) {
        width: 100%;
        height: 250px;
    }
    @media (max-width: 350px) {
        width: 100%;
        height: 200px;
    }
`;

export const Image = styled.img`
    width: 400px;
    height: 350px;
    border-radius: 10px;
    margin-bottom: 12px;
    @media (max-width: 420px) {
        width: 100%;
        height: 250px;
    }
    @media (max-width: 350px) {
        width: 100%;
        height: 200px;
    }
`;

export const ArrowDiv = styled.div`
    color: var(--dark-blue);
    & svg {
        color: var(--dark-blue);
        fill: var(--dark-blue);
    }
`;
