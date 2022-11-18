import { parse as csvParse } from "csv-parse";
import fs from "fs";

class ImportCategoryUseCase {
    execute(file: Express.Multer.File): void {

        const stream = fs.createReadStream(file.path);

        // Responsavel por ler linha por linha em nosso arquivo
        const parseFile = csvParse();

        // pipe pega nosso pedaço lido e passa para o parse file
        stream.pipe(parseFile);

        parseFile.on("data", async (line) => {
            console.log(line)
        })
    }
}

export { ImportCategoryUseCase }