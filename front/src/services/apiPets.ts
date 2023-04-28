import axios from 'axios';

const BASE_URL = 'http://localhost:3006';

const apiPets = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});
export default apiPets;

// interfaces padrões =======================================
export interface IFotoAnuncio {
    foto: string;
    extensao: string;
}

export interface IAnunciosData {
    cod_anuncio: number;
    cod_usuario: number;
    cod_animal: number;
    descricao: string;
    cep: number;
    uf: string;
    cidade: string;
    bairro: string;
    endereco: string;
    numero: number;
    complemento: string;
    data_anuncio: Date;
    tel: string;
    tel2: string;
    tipo: 'A' | 'P';
    nome_animal: string;
    especie: 'C' | 'G';
    idade: string;
    raca: string;
    cor: string;
    sexo: 'F' | 'M';
    nome: string;
    email: string;
    created_at: string;
    updated_at: string;
    foto_principal: IFotoAnuncio;
}

export interface IAnuncios {
    data: IAnunciosData[];
    count: number;
    limit: number;
    page: number;
    totalPages: number;
}
