import { Animal } from "@modules/animal/entities/Animal";
import { IAnimalRepository } from "@modules/animal/repositories/IAnimalRepository";
import { inject, injectable } from "tsyringe";

// eslint-disable-next-line @typescript-eslint/no-var-requires

interface IRequest {
    cod_usuario: number;
    especie: string;
    nome: string;
    idade: string;
    raca: string;
    cor: string;
}

@injectable()
class CreateAnnouncementPhotosUseCase {
    constructor(
        @inject("AnimalRepository")
        private animalRepository: IAnimalRepository
    ) {}

    async execute({
        cod_usuario,
        especie,
        nome,
        idade,
        raca,
        cor,
    }: IRequest): Promise<Animal> {
        const newAnimal = await this.animalRepository.create({
            cod_usuario,
            especie,
            nome,
            idade,
            raca,
            cor,
        });
        return newAnimal;
    }
}

export { CreateAnnouncementPhotosUseCase };
