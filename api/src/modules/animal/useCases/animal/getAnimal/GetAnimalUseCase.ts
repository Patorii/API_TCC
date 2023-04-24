import { Animal } from "@modules/animal/entities/Animal";
import { IAnimalRepository } from "@modules/animal/repositories/IAnimalRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    cod_animal: number;
}

@injectable()
class GetAnimalUseCase {
    constructor(
        @inject("AnimalRepository")
        private animalRepository: IAnimalRepository
    ) {}

    async execute({ cod_animal }: IRequest): Promise<Animal> {
        if (cod_animal) {
            throw new AppError("O código do animal deve ser informado.");
        }
        const animal = await this.animalRepository.findById(cod_animal);

        if (!animal) {
            throw new AppError(
                "O código de animal informado não foi localizado na lista."
            );
        }
        return animal;
    }
}

export { GetAnimalUseCase };
