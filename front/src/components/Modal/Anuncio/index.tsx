import React, { useEffect, useState } from 'react';
import {
    ButtonArea,
    Container,
    ConteinerLoader,
    Description,
    InformationLine,
    RigthSideTitle,
    Topic,
    TopicText,
    TopicsArea,
} from './styles';
import apiPets, { IAnunciosData } from '../../../services/apiPets';
import { Image, LeftSide, PetName, RigthSide } from './styles';
import { Loader } from '../../Loading';
import { Text } from '../../Text';
import { Button } from '../../Button';
import { useNavigate } from 'react-router-dom';
import { telefonePattern } from '../../../constants/telefoneNumber';

interface IProps {
    codAnuncio: number;
}

function Anuncio({ codAnuncio }: IProps) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [anuncio, setAnuncio] = useState<IAnunciosData>({} as IAnunciosData);

    async function getAnuncio(codAnuncio: number) {
        setLoading(true);
        const resp = await apiPets
            .get(`/announcements/${codAnuncio}`)
            .then((resp) => resp.data);
        setAnuncio({ ...resp, raca: resp.raca.toLowerCase() });
        setLoading(false);
    }

    useEffect(() => {
        getAnuncio(codAnuncio);
    }, []);
    return (
        <Container>
            {loading ? (
                <ConteinerLoader>
                    <Loader width="128px" height="128px" />
                </ConteinerLoader>
            ) : (
                <Container>
                    <LeftSide>
                        <Image
                            src={`data:image/jpeg;base64,${anuncio.foto_principal?.foto}`}
                        />
                        <PetName>{anuncio.nome_animal}</PetName>
                    </LeftSide>
                    <RigthSide>
                        <RigthSideTitle>
                            Sobre {anuncio.nome_animal}
                        </RigthSideTitle>
                        <Description>{anuncio.descricao}</Description>
                        <InformationLine>
                            <TopicsArea>
                                <Topic>Sexo:</Topic>
                                <TopicText>
                                    {anuncio.sexo === 'F' ? 'Fêmea' : 'Macho'}
                                </TopicText>
                            </TopicsArea>
                            <TopicsArea>
                                <Topic>Raça:</Topic>
                                <TopicText capitalize={true}>
                                    {anuncio.raca}
                                </TopicText>
                            </TopicsArea>
                        </InformationLine>

                        <TopicsArea>
                            <Topic>Idade:</Topic>
                            <TopicText>{anuncio.idade}</TopicText>
                        </TopicsArea>

                        <TopicsArea>
                            <Topic>Dono:</Topic>
                            <TopicText>{anuncio.nome}</TopicText>
                        </TopicsArea>

                        {anuncio.tel ? (
                            <TopicsArea>
                                <Topic>Contato:</Topic>
                                <TopicText>
                                    {telefonePattern(anuncio.tel)}
                                </TopicText>
                            </TopicsArea>
                        ) : (
                            <></>
                        )}
                        <ButtonArea>
                            <Button
                                buttonSize="small"
                                caption="Mais informações"
                                buttonType="tertiary"
                                onClick={() =>
                                    navigate(`/anuncio/${codAnuncio}`)
                                }
                            />
                        </ButtonArea>
                    </RigthSide>
                </Container>
            )}
        </Container>
    );
}

export { Anuncio };
