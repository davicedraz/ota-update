const path = require('path');
const multer = require('multer');

module.exports = {
    limits: { fileSize: process.env.MAX_SIZE || 3 * 1024 * 1024 },
    dest: path.resolve(__dirname, '..', '..', '..', 'bin'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const { project, board } = req.body;
            cb(null, path.resolve(__dirname, '..', '..', '..', 'bin', project, board, process.env.ENV === 'production' ? 'releases' : 'dev'));
        },
        filename: (req, file, cb) => {
            const { project, version } = req.body;
            const name = `${project}_v${version}.bin`;
            cb(null, name);
        }
    }),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext === '.bin') {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."));
        }
    }
};