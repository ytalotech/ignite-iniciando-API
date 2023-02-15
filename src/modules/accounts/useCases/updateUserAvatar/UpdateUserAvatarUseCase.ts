import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    // Adicionar coluna avatar na tabela de users
    // Refatorar usuario com coluna avatar
    // Configuração upload multer
    // Criar regra de negocio do upload
    // Criar controller
    constructor(
        @inject("UsersRepository")
        private UsersRepository: IUsersRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) { }

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.UsersRepository.findById(user_id);

        if (user.avatar) {
            await this.storageProvider.delete(user.avatar, "avatar")
        }

        await this.storageProvider.save(avatar_file, "avatar");

        user.avatar = avatar_file;

        await this.UsersRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase }