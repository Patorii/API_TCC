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
}

@injectable()
class UpdateAnimalUseCase {
    constructor(
        @inject("AnimalRepository")
        private animalRepository: IAnimalRepository
    ) {}

    async execute(data: IRequest): Promise<Animal> {
        const animalExists = await this.animalRepository.findById(
            data.cod_animal
        );

        if (!animalExists) {
            throw new AppError(
                "O código de animal informado não foi localizado na lista."
            );
        }

        if (animalExists.cod_usuario !== data.cod_usuario) {
            throw new AppError(
                "Não é possivel alterar o animal cadastrado por outro usuário.",
                401
            );
        }

        const animal = await this.animalRepository.update(data);
        return animal;
    }
}

export { UpdateAnimalUseCase };
