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
    cep: string;
    uf: string;
    cidade: string;
    bairro: string;
    endereco: string;
    numero: number;
    complemento?: string;
    data_anuncio: Date;
    tel?: string;
    tel2?: string;
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

export interface IAnimal {
    cod_animal: number;
    cod_usuario: number;
    especie: 'C' | 'G';
    nome: string;
    idade: string;
    raca: string;
    cor: string;
    sexo: 'F' | 'M';
    created_at?: string;
    updated_at?: string;
}

export interface ICriaAnuncio {
    cod_anuncio: number;
    cod_usuario: number;
    cod_animal: number;
    tipo: 'A' | 'P';
    descricao: string;
    cep: string;
    uf: string;
    cidade: string;
    bairro: string;
    endereco: string;
    numero: number;
    complemento: string;
    data_anuncio: Date;
    created_at?: Date;
    updated_at?: Date;
}

export interface IUser {
    cod_usuario: string | number;
    cpf: string;
    cnpj: string;
    nome: string;
    email: string;
}

export interface IFoto {
    cod_foto_anuncio?: number;
    cod_anuncio: number;
    extensao: string;
    arquivo: string;
    capa: 'N' | 'S';
    foto: string;
    created_at?: Date;
    updated_at?: Date;
}
