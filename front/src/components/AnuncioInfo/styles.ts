import styled from 'styled-components';

interface ITopicTextProps {
    capitalize?: boolean;
}
export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 16px;
`;

export const AnnouncementArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 800px;
    width: 100%;
    gap: 12px;
`;

export const PetName = styled.p`
    font-size: 36px;
    font-weight: 1000;
    color: var(--dark-blue);
`;

export const Description = styled.p`
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: var(--dark-blue);
    text-align: justify;
`;
export const SeparatorTitle = styled.p`
    font-size: 18px;
    font-weight: 600;
    margin-bottom: -8px;
`;
export const InformationArea = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    @media (max-width: 800px) {
        flex-direction: column;
        justify-content: start;
    }
`;
export const PetInformation = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    @media (max-width: 800px) {
        width: 100%;
    }
`;
export const ContactInformation = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    @media (max-width: 800px) {
        width: 100%;
        gap: 8px;
    }
`;

export const TopicArea = styled.div`
    width: auto;
    display: flex;
    gap: 4px;
    @media (max-width: 360px) {
        flex-direction: column;
    }
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
    @media (max-width: 259px) {
        width: 180px;
        overflow-wrap: break-word;
        word-wrap: break-all;
    }
`;

export const ButtonArea = styled.div`
    margin-top: 32px;
    width: 80px;
    align-self: center;
`;
