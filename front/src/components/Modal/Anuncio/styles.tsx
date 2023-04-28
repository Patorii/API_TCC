import styled from 'styled-components';

export const Container = styled.div`
    background-color: var(--grey-blue);
    display: flex;
    gap: 12px;
    max-width: 800px;
    width: 800px;
    overflow: hidden;
`;

export const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
`;

export const Image = styled.img`
    width: 100%;
    height: 350px;
    border-radius: 10px;
`;
export const PetName = styled.p`
    font-size: 36px;
    font-weight: 1000;
    color: var(--dark-blue);
`;
export const RigthSide = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
`;

export const RigthSideTitle = styled.p`
    font-size: 24px;
    font-weight: 1000;
    color: var(--dark-blue);
    align-self: center;
`;

export const Description = styled.p`
    font-size: 16px;
    font-weight: 400;
    color: var(--dark-blue);
    height: 200px;
    overflow-y: auto;
    text-align: justify;
    padding-right: 4px;
`;

export const InformationLine = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const TopicsArea = styled.div`
    width: auto;
    display: flex;
    gap: 4px;
`;
export const Topic = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: var(--dark-blue);
`;
export const TopicText = styled.span`
    font-size: 16px;
    font-weight: 400;
    color: var(--dark-blue);
`;
export const ButtonArea = styled.div`
    width: 190px;
    align-self: center;
`;
