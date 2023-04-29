import styled from 'styled-components';

interface ITopicTextProps {
    capitalize?: boolean;
}

export const Container = styled.div`
    background-color: var(--grey-blue);
    display: flex;
    gap: 12px;
    max-width: 800px;
    width: 100%;
    overflow: hidden;
    @media (max-width: 820px) {
        height: 600px;
        overflow-y: scroll;
        width: 100%;
        flex-direction: column;
        padding: 0px 8px;
    }
`;

export const ConteinerLoader = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    @media (max-width: 820px) {
        flex-direction: column-reverse;
    }
`;

export const Image = styled.img`
    width: 100%;
    height: 350px;
    border-radius: 10px;
    @media (max-width: 400px) {
        height: 250px;
    }
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
    max-height: 200px;
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

export const TopicText = styled.span<ITopicTextProps>`
    font-size: 16px;
    font-weight: 400;
    color: var(--dark-blue);
    text-transform: ${({ capitalize }) => (capitalize ? 'capitalize' : '')};
`;

export const ButtonArea = styled.div`
    width: 190px;
    align-self: center;
`;
