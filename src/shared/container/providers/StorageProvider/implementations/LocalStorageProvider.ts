import fs from 'fs';
import { resolve } from 'path';

import upload from '@config/upload';
import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
    async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            resolve(upload.tmpFolder, file),//remove dessa primeira pasta
            resolve(`${upload.tmpFolder}/${folder}`, file)//adiciona nessa outra pasta
        );

        return file;
    }

    async delete(file: string, folder: string): Promise<void> {
        const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

        try {
            // Veriicar se arquivo existe
            await fs.promises.stat(filename);
        } catch {
            return;
        }

        // Se deu sucesso
        await fs.promises.unlink(filename);
    }
}

export { LocalStorageProvider }