import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) { }

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

        console.log(categories);
    }
}

export { ImportCategoryUseCase }