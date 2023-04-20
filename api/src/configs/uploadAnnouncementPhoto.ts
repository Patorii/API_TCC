import * as fs from "fs";
import multer from "multer";

export const storage = multer.diskStorage({
    destination: async (request, file, callback) => {
        const { codanuncio } = request.params;
        const folder = `./tmp/anuncio/${codanuncio}/images`;

        if (fs.existsSync(folder)) {
            return callback(null, folder);
        }

        await fs.mkdirSync(folder, { recursive: true });

        return callback(null, folder);
    },
    filename: async (request, file, callback) => {
        const { codanuncio } = request.params;
        const formatFile = file.originalname.split(".")[1];
        const files = await fs.readdirSync(
            `./tmp/anuncio/${codanuncio}/images`
        );

        const regex = new RegExp(`^${codanuncio}_`, "g");
        const filterFiles = await files?.filter((photo) => photo.match(regex));
        const indexFiles = await filterFiles.map((item) =>
            Number(item.match(/(?<=_).*(?=[.])/)[0])
        );

        const lastIndex = await indexFiles.sort((a, b) => b - a)[0];

        const fileName = await `${codanuncio}_${
            (!lastIndex ? 0 : lastIndex) + 1
        }.${formatFile}`;

        return callback(null, fileName);
    },
});
