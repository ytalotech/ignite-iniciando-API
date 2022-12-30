import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

// control + . em cima da classe paraw pegar os metodos interface
class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    async create({brand, category_id, daily_rate, description, fine_amount, name, license_plate}: ICreateCarDTO): Promise<void> {
        const car = new Car();

        Object.assign({
            brand, 
            category_id, 
            daily_rate, 
            description, 
            fine_amount, 
            name, 
            license_plate
        });

        this.cars.push(car);
    }

}

export { CarsRepositoryInMemory }