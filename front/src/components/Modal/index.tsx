import React from 'react';
import Modal, { Styles } from 'react-modal';
import { Container, Xdiv } from './styles';
import { IoClose } from 'react-icons/io5';

interface IProps {
    isOpen: boolean;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    marginRight?: string;
    transform?: string;
    children: React.ReactNode;
    closeFunction: () => void;
}
function ModalPopUp({
    isOpen,
    top = '50%',
    left = '50%',
    right = 'auto',
    bottom = 'auto',
    marginRight = '-50%',
    transform = 'translate(-50%, -50%)',
    children,
    closeFunction,
}: IProps) {
    const style: Styles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.20)',
            zIndex: 8,
        },
        content: {
            padding: '0px',
            top,
            left,
            right,
            bottom,
            marginRight,
            transform,
            zIndex: 10,
            position: 'absolute',
            borderRadius: '10px',
            boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.35)',
        },
    };

    return (
        <Modal isOpen={isOpen} style={style} onRequestClose={closeFunction}>
            <Container>
                <Xdiv>
                    <IoClose size={32} onClick={closeFunction} />
                </Xdiv>
                {children}
            </Container>
        </Modal>
    );
}

export { ModalPopUp };
