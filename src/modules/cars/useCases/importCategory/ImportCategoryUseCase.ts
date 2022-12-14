import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) { }

    // como estamos trabalhando com promisse o retorno deve ser promisse Promise<IImportCategory[]>
    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

            // Responsavel por ler linha por linha em nosso arquivo
            const parseFile = csvParse();

            // pipe pega nosso pedaço lido e passa para o parse file
            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    // ["name", "description"]
                    const [name, description] = line;
                    categories.push({
                        name,
                        description
                    });
                })
                .on("end", () => {
                    // Remove o arquivo do tmp
                    fs.promises.unlink(file.path)
                    // Quando finalizar colocar no resolve os resultados
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err)
                })
        })
    }

    // Quando temos um async temos que definir que o reotnro vai ser Promise
    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        categories.map(async (category) => {
            const { name, description } = category;

            const existCategory = await this.categoriesRepository.findByName(name);

            if (!existCategory) {
                await this.categoriesRepository.create({
                    name,
                    description
                })
            }
        })
    }
}

export { ImportCategoryUseCase }