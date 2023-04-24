import { IAnimalRepository } from "@modules/animal/repositories/IAnimalRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    cod_animal: number;
    cod_usuario: number;
}

@injectable()
class DeleteAnimalUseCase {
    constructor(
        @inject("AnimalRepository")
        private animalRepository: IAnimalRepository
    ) {}

    async execute({ cod_animal, cod_usuario }: IRequest): Promise<void> {
        if (!cod_animal) {
            throw new AppError("O código do animal deve ser informado.");
        }
        const animalExists = await this.animalRepository.findById(cod_animal);

        if (!animalExists) {
            throw new AppError(
                "O código de animal informado não foi localizado na lista."
            );
        }
        if (animalExists.cod_usuario !== cod_usuario) {
            throw new AppError(
                "Não é possivel apagar o animal cadastrado por outro usuário.",
                401
            );
        }
        await this.animalRepository.delete(cod_animal);
    }
}

export { DeleteAnimalUseCase };
