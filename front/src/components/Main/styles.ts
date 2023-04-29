import styled from 'styled-components';

interface IToggleFilter {
    show: boolean;
}

export const Container = styled.div`
    display: flex;
    gap: 40px;
    height: 100%;
    width: 100%;
    @media (max-width: 560px) {
        flex-direction: column;
    }
`;

export const Aside = styled.div<IToggleFilter>`
    position: relative;
    width: ${({ show }) => (show ? '250px' : '0px')};
    transition: 2s width, 2s height;
    @media (max-width: 560px) {
        width: 100%;
        height: ${({ show }) => (show ? '476px' : '0px')};
    }
`;
export const Wrapper = styled.div<IToggleFilter>`
    position: relative;
    width: ${({ show }) => (show ? '250px' : '0px')};
    overflow: hidden;
    transition: 2s width, 2s height;
    @media (max-width: 560px) {
        height: ${({ show }) => (show ? '476px' : '0px')};
        width: 100%;
    }
`;
export const FilterArea = styled.div<IToggleFilter>`
    position: relative;
    width: ${({ show }) => (show ? '250px' : '0px')};
    height: auto;
    background-color: var(--dark-blue);
    border-radius: 0px 0px 10px 0px;
    padding: 12px 12px 24px 16px;
    transition: 2s width, 2s height;

    @media (max-width: 560px) {
        width: 100%;
        height: ${({ show }) => (show ? '476px' : '0px')};
    }
`;

export const ToggleArrowArea = styled.div<IToggleFilter>`
    cursor: pointer;
    user-select: none;
    z-index: 6;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 20px;
    right: ${({ show }) => (show ? '-15px' : '-35px')};
    width: 32px;
    height: 32px;
    background-color: var(--blue-bootstrap);
    border-radius: 50%;
    transform: ${({ show }) => (show ? 'rotate(0deg)' : 'rotate(180deg)')};
    transition: 2s transform, 2.2s right,
        ${({ show }) => (show ? '2.8s top' : '2.5s top')};
    @media (max-width: 560px) {
        transform: ${({ show }) => (show ? 'rotate(90deg)' : 'rotate(270deg)')};
        top: 98%;
        right: calc(50% - 16px);
    }
`;
