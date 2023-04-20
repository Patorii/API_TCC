import { IAnimalRepository } from "@modules/animal/repositories/IAnimalRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    cod_animal: number;
}

@injectable()
class DeleteAnimalUseCase {
    constructor(
        @inject("AnimalRepository")
        private animalRepository: IAnimalRepository
    ) {}

    async execute({ cod_animal }: IRequest): Promise<void> {
        await this.animalRepository.delete(cod_animal);
    }
}

export { DeleteAnimalUseCase };
