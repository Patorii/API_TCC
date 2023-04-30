import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 16px;
`;

export const AnnouncementPhotosArea = styled.div`
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

export const InputArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    margin-bottom: 24px;
`;

export const RadiosArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    height: 42px;
    @media (max-width: 820px) {
        margin-bottom: 16px;
    }
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
export const ButtonArea = styled.div`
    margin-top: 32px;
    width: 80px;
    align-self: center;
`;

export const Title = styled.p`
    font-size: 24px;
    font-weight: 800;
    color: var(--dark-blue);
`;

export const ImageArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: relative;
    width: 400px;
    margin-bottom: 32px;
    @media (max-width: 420px) {
        width: 100%;
    }
`;

export const ImageBtnsArea = styled.div`
    width: 100%;
    display: flex;
    gap: 12px;
    justify-content: space-between;
    flex-wrap: wrap;
    @media (max-width: 300px) {
        flex-direction: column;
    }
`;

export const DefaultBtnArea = styled.div`
    margin: 0px auto;
    width: auto;
    @media (max-width: 300px) {
        margin: 0px;
        width: 100%;
    }
`;
export const BtnArea = styled.div`
    width: auto;
`;

export const Image = styled.img`
    width: 100%;
    height: 350px;
    border-radius: 10px;
    margin-bottom: 12px;
    @media (max-width: 420px) {
        height: 250px;
    }
    @media (max-width: 350px) {
        height: 200px;
    }
`;
