import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { deleteFile } from "@utils/file";

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
        private UsersRepository: IUsersRepository
    ) { }

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.UsersRepository.findById(user_id);

        if (user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }
        user.avatar = avatar_file;

        await this.UsersRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase }