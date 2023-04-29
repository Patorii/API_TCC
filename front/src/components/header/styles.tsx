import styled from 'styled-components';
interface IButtonProps {
    width?: string;
    signed: boolean;
}

interface IHamburguerMenu {
    open: boolean;
}
export const Container = styled.header<IHamburguerMenu>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    background: var(--dark-blue);
    padding: 16px 32px;
    position: relative;
    overflow: hidden;
    transition: 1s height;
    @media (max-width: 720px) {
        height: ${({ open }) => (open ? '324px' : '80px')};
        align-items: flex-start;
    }
`;

export const IconArea = styled.div`
    width: 48px;
    height: 48px;
    cursor: pointer;
    user-select: none;
    @media (max-width: 720px) {
        position: absolute;
        top: 16px;
        left: 32px;
    }
`;

export const ButtonsArea = styled.div<IButtonProps>`
    height: 42px;
    width: ${({ width }) => width || '102px'};

    @media (max-width: 720px) {
        ${({ signed }) =>
            signed ? '' : 'position: absolute; top: 16px; right: 32px;'}
    }
`;
export const ButtonsAreaSigned = styled.div`
    display: flex;
    gap: 12px;
    height: 42px;
    @media (max-width: 720px) {
        width: 100%;
        padding-top: 80px;
        flex-direction: column;
        align-items: center;
        height: auto;
    }
`;

export const HamburguerIconArea = styled.div`
    width: 48px;
    height: 48px;
    cursor: pointer;
    user-select: none;
    position: absolute;
    right: 16px;
    display: none;
    @media (max-width: 720px) {
        display: block;
    }
`;
