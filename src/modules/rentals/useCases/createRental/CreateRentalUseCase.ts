import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

// dayjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {
    constructor(
        private rentalsRepository: IRentalsRepository,
        private dateProvider: IDateProvider,
    ) { }

    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
        const minimumHour = 24;
        // Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if (carUnavailable) {
            throw new AppError("Car is unavailable");
        }
        // Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user!");
        }
        // O aluguel deve ter duração mínima de 24 horas.
        const dateNow = this.dateProvider.dateNow();
        const compare = this.dateProvider.comprareInHours(dateNow, expected_return_date);

        if (compare < minimumHour) {
            throw new AppError("Invalid return time!");
        }

        const rental = this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        })
        return rental;
    }
}

export { CreateRentalUseCase }