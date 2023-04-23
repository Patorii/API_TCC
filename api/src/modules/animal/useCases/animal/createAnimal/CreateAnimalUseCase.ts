import { Animal } from "@modules/animal/entities/Animal";
import { IAnimalRepository } from "@modules/animal/repositories/IAnimalRepository";
import { inject, injectable } from "tsyringe";

// eslint-disable-next-line @typescript-eslint/no-var-requires

interface IRequest {
    cod_usuario: number;
    especie: "C" | "G";
    nome: string;
    idade: string;
    raca: string;
    cor: string;
}

@injectable()
class CreateAnimalUseCase {
    constructor(
        @inject("AnimalRepository")
        private animalRepository: IAnimalRepository
    ) {}

    async execute(data: IRequest): Promise<Animal> {
        const newAnimal = await this.animalRepository.create(data);
        return newAnimal;
    }
}

export { CreateAnimalUseCase };
