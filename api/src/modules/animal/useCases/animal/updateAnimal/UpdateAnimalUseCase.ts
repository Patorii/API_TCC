import { Animal } from "@modules/animal/entities/Animal";
import { IAnimalRepository } from "@modules/animal/repositories/IAnimalRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-var-requires
interface IRequest {
    cod_animal: number;
    cod_usuario: number;
    especie: string;
    nome: string;
    idade: string;
    raca: string;
    cor: string;
    cod_usuario_atual: number;
}

@injectable()
class UpdateAnimalUseCase {
    constructor(
        @inject("AnimalRepository")
        private animalRepository: IAnimalRepository
    ) {}

    async execute({
        cod_animal,
        cod_usuario,
        especie,
        nome,
        idade,
        raca,
        cor,
        cod_usuario_atual,
    }: IRequest): Promise<Animal> {
        const animalExists = await this.animalRepository.findById(cod_animal);

        if (!animalExists) {
            throw new AppError(
                "O código de animal informado não foi localizado na lista."
            );
        }

        if (animalExists.cod_usuario !== cod_usuario_atual) {
            throw new AppError(
                "Não é possivel apagar o animal cadastrado por outro usuário.",
                401
            );
        }

        const animal = await this.animalRepository.update({
            cod_animal,
            cod_usuario,
            especie,
            nome,
            idade,
            raca,
            cor,
        });
        return animal;
    }
}

export { UpdateAnimalUseCase };
