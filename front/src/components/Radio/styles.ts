import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    .form-check-input:checked {
        background-color: var(--cyan);
        border-color: var(--cyan);
    }
`;
