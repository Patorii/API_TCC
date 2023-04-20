import { IRefreshTokensRepository } from "@modules/accounts/repositories/IRefreshTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { RefreshTokensRepository } from "@modules/accounts/repositories/knex/RefreshTokensRepository";
import { UsersRepository } from "@modules/accounts/repositories/knex/UsersRepository";
import { IAnimalRepository } from "@modules/animal/repositories/IAnimalRepository";
import { AnimalRepository } from "@modules/animal/repositories/knex/AnimalRepository";
import { IAnnouncementPhotosRepository } from "@modules/annoucement/repositories/IAnnouncementPhotosRepository";
import { IAnnouncementRepository } from "@modules/annoucement/repositories/IAnnouncementRepository";
import { AnnouncementPhotosRepository } from "@modules/annoucement/repositories/knex/AnnouncementPhotosRepository";
import { AnnouncementRepository } from "@modules/annoucement/repositories/knex/AnnouncementRepository";
import { container } from "tsyringe";

import { IDateProvider } from "./providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "./providers/DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./providers/MailProvider/IMailProvider";
import { EtherealMailProvider } from "./providers/MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
);

container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider()
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);
container.registerSingleton<IRefreshTokensRepository>(
    "RefreshTokensRepository",
    RefreshTokensRepository
);
container.registerSingleton<IAnimalRepository>(
    "AnimalRepository",
    AnimalRepository
);
container.registerSingleton<IAnnouncementRepository>(
    "AnnouncementRepository",
    AnnouncementRepository
);
container.registerSingleton<IAnnouncementPhotosRepository>(
    "AnnouncementPhotosRepository",
    AnnouncementPhotosRepository
);
