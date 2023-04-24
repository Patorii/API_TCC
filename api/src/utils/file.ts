import fs, { existsSync } from "fs";

export async function fileExists(filename: string) {
    if (existsSync(filename)) {
        return true;
    }
    return false;
}

export const deleteFile = async (filename: string) => {
    if (fileExists(filename)) {
        await fs.promises.unlink(filename);
    }
};
