import React, { ReactNode, useState } from 'react';
import {
    Aside,
    Container,
    FilterArea,
    ToggleArrowArea,
    Wrapper,
} from './styles';
import { Filter } from '../Filter/Index';
import { IoArrowBack } from 'react-icons/io5';

interface IProps {
    children: ReactNode;
}

function Main({ children }: IProps) {
    const [showFilter, setShowFilter] = useState<boolean>(true);

    return (
        <Container>
            <Aside show={showFilter}>
                <ToggleArrowArea
                    show={showFilter}
                    onClick={() => setShowFilter(!showFilter)}
                >
                    <IoArrowBack size={24} color="var(--white)" />
                </ToggleArrowArea>
                <Wrapper show={showFilter}>
                    <FilterArea show={showFilter}>
                        <Filter />
                    </FilterArea>
                </Wrapper>
            </Aside>
            {children}
        </Container>
    );
}

export { Main };
