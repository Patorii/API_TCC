import { Animal } from "@modules/animal/entities/Animal";
import { IAnimalRepository } from "@modules/animal/repositories/IAnimalRepository";
import { inject, injectable } from "tsyringe";

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
        const animal = await this.animalRepository.findById(cod_animal);
        return animal;
    }
}

export { GetAnimalUseCase };
