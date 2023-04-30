import React, { useState, useEffect } from 'react';
import {
    AnnouncementArea,
    ButtonArea,
    ContactInformation,
    Container,
    Description,
    InformationArea,
    PetInformation,
    PetName,
    SeparatorTitle,
    Topic,
    TopicArea,
    TopicText,
} from './styles';
import apiPets, { IAnunciosData, IFoto } from '../../services/apiPets';
import { telefonePattern } from '../../constants/telefoneNumber';
import { Button } from '../Button';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../Loading';
import { Carousel } from '../Carousel';
interface IProps {
    codAnuncio: number;
}
function AnuncioInfo({ codAnuncio }: IProps) {
    const { signed } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [anuncio, setAnuncio] = useState<IAnunciosData>({} as IAnunciosData);
    const [fotos, setFotos] = useState<Array<IFoto>>([{} as IFoto]);

    async function getAnuncio(codAnuncio: number) {
        const resp = await apiPets
            .get(`/announcements/${codAnuncio}`)
            .then((resp) => resp.data);
        setAnuncio({ ...resp, raca: resp.raca.toLowerCase() });
    }

    async function getFotosAnuncio(codAnuncio: number) {
        const resp = await apiPets
            .get(`/announcements/${codAnuncio}/photos`)
            .then((resp) => resp.data);
        setFotos(resp);
    }

    useEffect(() => {
        setLoading(true);
        getAnuncio(codAnuncio);
        getFotosAnuncio(codAnuncio);
        setLoading(false);
    }, []);

    return (
        <Container>
            {loading ? (
                <Loader width="256px" height="256px" />
            ) : (
                <AnnouncementArea>
                    <PetName>{anuncio.nome_animal}</PetName>

                    <Carousel fotos={fotos} />
                    <Description>{anuncio.descricao}</Description>
                    <SeparatorTitle>Informações Gerais</SeparatorTitle>
                    <InformationArea>
                        <ContactInformation>
                            <TopicArea>
                                <Topic>Dono:</Topic>
                                <TopicText>{anuncio.nome}</TopicText>
                            </TopicArea>
                            <TopicArea>
                                <Topic>E-mail:</Topic>
                                <TopicText>{anuncio.email}</TopicText>
                            </TopicArea>
                            {anuncio.tel ? (
                                <TopicArea>
                                    <Topic>Contato:</Topic>
                                    <TopicText>
                                        {telefonePattern(anuncio.tel)}
                                    </TopicText>
                                </TopicArea>
                            ) : (
                                <></>
                            )}
                            {anuncio.tel2 ? (
                                <TopicArea>
                                    <Topic>Contato:</Topic>
                                    <TopicText>
                                        {telefonePattern(anuncio.tel2)}
                                    </TopicText>
                                </TopicArea>
                            ) : (
                                <></>
                            )}
                        </ContactInformation>
                        <PetInformation>
                            <TopicArea>
                                <Topic>Raça:</Topic>
                                <TopicText capitalize={true}>
                                    {anuncio.raca}
                                </TopicText>
                            </TopicArea>
                            <TopicArea>
                                <Topic>Sexo:</Topic>
                                <TopicText>
                                    {anuncio.sexo === 'F' ? 'Fêmea' : 'Macho'}
                                </TopicText>
                            </TopicArea>
                        </PetInformation>
                        <PetInformation>
                            <TopicArea>
                                <Topic>Idade:</Topic>
                                <TopicText>{anuncio.idade}</TopicText>
                            </TopicArea>
                            <TopicArea>
                                <Topic>Cor:</Topic>
                                <TopicText>{anuncio.cor}</TopicText>
                            </TopicArea>
                        </PetInformation>
                    </InformationArea>
                    <SeparatorTitle>Endereço</SeparatorTitle>
                    <InformationArea>
                        <TopicArea>
                            <Topic>CEP:</Topic>
                            <TopicText capitalize={true}>
                                {anuncio.cep}
                            </TopicText>
                        </TopicArea>
                        <TopicArea>
                            <Topic>Estado:</Topic>
                            <TopicText>{anuncio.uf}</TopicText>
                        </TopicArea>
                        <TopicArea>
                            <Topic>Cidade:</Topic>
                            <TopicText>{anuncio.cidade}</TopicText>
                        </TopicArea>
                        <TopicArea>
                            <Topic>Rua:</Topic>
                            <TopicText>
                                {anuncio.endereco}, {anuncio.numero}
                            </TopicText>
                        </TopicArea>

                        {anuncio.complemento ? (
                            <TopicArea>
                                <Topic>Complemento:</Topic>
                                <TopicText>{anuncio.complemento}</TopicText>
                            </TopicArea>
                        ) : (
                            <></>
                        )}
                    </InformationArea>
                    <ButtonArea>
                        <Button
                            caption="Voltar"
                            buttonType="tertiary"
                            onClick={() =>
                                signed ? navigate('/') : navigate('/')
                            }
                        />
                    </ButtonArea>
                </AnnouncementArea>
            )}
        </Container>
    );
}

export { AnuncioInfo };
