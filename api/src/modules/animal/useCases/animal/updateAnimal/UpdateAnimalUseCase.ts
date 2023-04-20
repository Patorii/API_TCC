import { Animal } from "@modules/animal/entities/Animal";
import { IAnimalRepository } from "@modules/animal/repositories/IAnimalRepository";
import { inject, injectable } from "tsyringe";

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

    async execute({
        cod_animal,
        cod_usuario,
        especie,
        nome,
        idade,
        raca,
        cor,
    }: IRequest): Promise<Animal> {
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
