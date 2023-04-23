interface IAnimalDTO {
    cod_animal?: number;
    cod_usuario: number;
    especie: "C" | "G";
    nome: string;
    idade: string;
    raca: string;
    cor: string;
    created_at?: Date;
    updated_at?: Date;
}

export { IAnimalDTO };
