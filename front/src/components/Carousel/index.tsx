import React from 'react';
import { IFoto } from '../../services/apiPets';
import { ArrowDiv, Container, Image } from './styles';

interface IProps {
    fotos: IFoto[];
}

function Carousel({ fotos }: IProps) {
    return (
        <Container id="carousel" className="carousel carousel-dark slide">
            <div className="carousel-inner">
                {fotos.map((foto: IFoto, i: number) => {
                    if (foto.capa === 'S') {
                        return (
                            <div
                                className="carousel-item active"
                                key={'foto' + i}
                            >
                                <Image
                                    src={`data:image/jpeg;base64,${foto.foto}`}
                                    className="d-block w-100"
                                    alt="foto do animal"
                                    title="foto do animal"
                                />
                            </div>
                        );
                    } else {
                        return (
                            <div className="carousel-item" key={'foto' + i}>
                                <Image
                                    src={`data:image/jpeg;base64,${foto.foto}`}
                                    className="d-block w-100"
                                    alt="foto do animal"
                                    title="foto do animal"
                                />
                            </div>
                        );
                    }
                })}
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carousel"
                data-bs-slide="prev"
            >
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carousel"
                data-bs-slide="next"
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>

                <span className="visually-hidden">Next</span>
            </button>
        </Container>
    );
}

export { Carousel };
