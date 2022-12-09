import fs from "fs";

export const deleteFile = async (filename: string) => {

    try {
        // Veriicar se arquivo existe
        await fs.promises.stat(filename);
    } catch {
        return;
    }

    // Se deu sucesso
    await fs.promises.unlink(filename);
}