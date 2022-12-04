import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private respository: Repository<User>;

    constructor() {
        this.respository = getRepository(User);
    }

    async create({ name, email, driver_license, password }: ICreateUserDTO): Promise<void> {
        const user = this.respository.create({
            name,
            email,
            driver_license,
            password
        });

        await this.respository.save(user);
    }
}

export { UsersRepository }