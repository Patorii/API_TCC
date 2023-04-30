import React, { useState, useEffect } from 'react';
import {
    AnnouncementPhotosArea,
    BtnArea,
    ButtonArea,
    Container,
    DefaultBtnArea,
    Image,
    ImageArea,
    ImageBtnsArea,
    InputArea,
    PetName,
    RadioTitle,
    RadiosArea,
    RadiosDiv,
} from './styles';
import apiPets, { IAnunciosData, IFoto } from '../../services/apiPets';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../Loading';
import { Title } from '../Filter/FilterSeparator/styles';
import { FileInputGroup } from '../Form/FileInputGroup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Radio } from '../Radio/Index';

interface IProps {
    codAnuncio: number;
}

function FotosAnuncio({ codAnuncio }: IProps) {
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState<boolean>(false);
    const [loadingToggleMainBtn, setLoadingToggleMainBtn] =
        useState<boolean>(false);
    const [loadingDeleteBtn, setLoadingDeleteBtn] = useState<boolean>(false);
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [anuncio, setAnuncio] = useState<IAnunciosData>({} as IAnunciosData);
    const [fotos, setFotos] = useState<Array<IFoto>>([{} as IFoto]);
    const [fotoPrincipal, setFotoPrincipal] = useState<IFoto>({} as IFoto);

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
        setFotoPrincipal(resp.find((foto: IFoto) => foto.capa === 'S'));
    }

    useEffect(() => {
        setLoading(true);
        getAnuncio(codAnuncio);
        getFotosAnuncio(codAnuncio);
        setLoading(false);
    }, [refresh]);

    type PhotoFormFields = {
        foto: FileList;
        capa: string;
    };

    const schema = yup.object().shape({
        foto: yup.mixed().required('É necessário selecionar uma foto'),
        capa: yup.string(),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<PhotoFormFields>({
        resolver: yupResolver(schema),
        defaultValues: {
            capa: 'N',
        },
    });

    const onSubmit: SubmitHandler<PhotoFormFields> = async (data) => {
        try {
            setLoadingBtn(true);
            await apiPets.post(
                `/announcements/${anuncio.cod_anuncio}/photos`,
                { foto: data.foto[0], capa: data.capa },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setTimeout(() => {
                setLoadingBtn(false);
                setRefresh(!refresh);
                toast.success('Foto adicionada com sucesso!');
            }, 500);
        } catch (err: any) {
            setLoadingBtn(false);
            toast.error(
                (err.response.data || err.message || err) +
                    '. Verifique a extensão do arquivo tente novamente!'
            );
        }
    };

    async function deletePhoto(cod: number) {
        try {
            setLoadingDeleteBtn(true);
            await apiPets.delete(`/announcements/photos/${cod}`);
            setTimeout(() => {
                setLoadingDeleteBtn(false);
                setRefresh(!refresh);
            }, 500);
        } catch (err) {
            setLoadingDeleteBtn(false);
            toast.error('Falha ao tentar excluir, tente novamente mais tarde!');
        }
    }

    async function toggleMainPhoto(cod: number) {
        try {
            setLoadingToggleMainBtn(true);
            await apiPets.patch(`/announcements/photos/${cod}`);
            setTimeout(() => {
                setLoadingToggleMainBtn(false);
                setRefresh(!refresh);
            }, 500);
        } catch (err) {
            setLoadingToggleMainBtn(false);
            toast.error(
                'Falha ao tentar definir como capa, tente novamente mais tarde!'
            );
        }
    }
    return (
        <Container>
            {loading ? (
                <Loader width="256px" height="256px" />
            ) : (
                <AnnouncementPhotosArea>
                    <PetName>{anuncio.nome_animal}</PetName>
                    <Title>Adicionar Foto</Title>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputArea>
                            <RadiosArea>
                                <RadioTitle>Foto de capa?</RadioTitle>
                                <RadiosDiv>
                                    <Radio
                                        name="capa"
                                        register={register}
                                        value="N"
                                        label="Não"
                                    />
                                    <Radio
                                        name="capa"
                                        register={register}
                                        value="S"
                                        label="Sim"
                                    />
                                </RadiosDiv>
                            </RadiosArea>
                            <FileInputGroup
                                label="Adicione uma foto"
                                name="foto"
                                type="file"
                                register={register}
                                errors={errors.foto}
                                buttonType="secondary"
                            />
                            <BtnArea>
                                <Button
                                    buttonKind="submit"
                                    caption="Salvar nova foto"
                                    buttonType="tertiary"
                                    loading={loadingBtn}
                                />
                            </BtnArea>
                        </InputArea>
                    </form>

                    <Title>Foto de capa</Title>
                    {fotoPrincipal && (
                        <ImageArea>
                            <Image
                                src={`data:image/jpeg;base64,${fotoPrincipal.foto}`}
                                alt="foto principal do animal"
                                title="foto principal do animal"
                            />
                            <ImageBtnsArea>
                                {fotos.length > 1 && (
                                    <DefaultBtnArea>
                                        <Button
                                            caption="Apagar"
                                            buttonType="danger"
                                            onClick={() =>
                                                deletePhoto(
                                                    fotoPrincipal.cod_foto_anuncio
                                                )
                                            }
                                        />
                                    </DefaultBtnArea>
                                )}
                            </ImageBtnsArea>
                        </ImageArea>
                    )}
                    <>
                        {fotos.length > 1 && <Title>Outras fotos</Title>}
                        {fotos.length > 1 &&
                            fotos.map((foto) => {
                                if (foto.capa === 'N') {
                                    return (
                                        <ImageArea
                                            key={
                                                'editfoto' +
                                                foto.cod_foto_anuncio
                                            }
                                        >
                                            <Image
                                                src={`data:image/jpeg;base64,${foto.foto}`}
                                                alt="foto principal do animal"
                                                title="foto principal do animal"
                                            />
                                            <ImageBtnsArea>
                                                <BtnArea>
                                                    <Button
                                                        caption="Definir como capa"
                                                        buttonType="tertiary"
                                                        onClick={() =>
                                                            toggleMainPhoto(
                                                                foto.cod_foto_anuncio
                                                            )
                                                        }
                                                        loading={
                                                            loadingToggleMainBtn
                                                        }
                                                    />
                                                </BtnArea>
                                                <BtnArea>
                                                    <Button
                                                        caption="Apagar"
                                                        buttonType="danger"
                                                        onClick={() =>
                                                            deletePhoto(
                                                                foto.cod_foto_anuncio
                                                            )
                                                        }
                                                        loading={
                                                            loadingDeleteBtn
                                                        }
                                                    />
                                                </BtnArea>
                                            </ImageBtnsArea>
                                        </ImageArea>
                                    );
                                }
                            })}
                    </>

                    <ButtonArea>
                        <Button
                            caption="Voltar"
                            buttonType="tertiary"
                            onClick={() => navigate('/meusanuncios')}
                        />
                    </ButtonArea>
                </AnnouncementPhotosArea>
            )}
        </Container>
    );
}

export { FotosAnuncio };
