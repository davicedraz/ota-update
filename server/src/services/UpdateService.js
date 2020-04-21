const fs = require('fs');
const path = require('path');

const basePath = path.resolve(__dirname, '..', '..', '..', 'bin');

const boardService = require('./BoardService');
const FWVersion = require('../firmware-version');

const code = require('../config/constants');

class UpdateService {

    async listAllFirmwares(board, project, requestHeaders) {
        try {
            const boardType = boardService.getBoard(board);
            const env = process.env.ENV === 'production' ? 'releases' : 'dev';

            this.device = {
                size: requestHeaders[boardType.size],
                mode: requestHeaders[boardType.mode],
                version: requestHeaders[boardType.version],
                path: path.resolve(basePath, project, board, env),
                project,
                board,
            };

            const firmwares = await fs.readdirSync(this.device.path);
            return { status: code.HTTP_OK, firmwares };

        } catch (error) {
            throw { status: error.status || code.HTTP_INTERNAL_ERROR, message: error.message };
        }

    }

    async lastestFirmwareVersion(board, project, requestHeaders) {
        try {
            const boardType = boardService.getBoard(board);
            const env = process.env.ENV === 'production' ? 'releases' : 'dev';

            this.device = {
                size: requestHeaders[boardType.size],
                mode: requestHeaders[boardType.mode],
                version: requestHeaders[boardType.version],
                path: path.resolve(basePath, project, board, env),
                project,
                board,
            };

            const shouldUpdate = await this.verifyUpdateCondition();
            if (!shouldUpdate) throw { status: code.HTTP_NOT_MODIFIED, message: [] };

            return { status: code.HTTP_OK, firmware: this.getFirmwareDirectory() };

        } catch (error) {
            throw { status: error.status || code.HTTP_INTERNAL_ERROR, message: error.message };
        }
    }

    verifyUpdateCondition() {
        const files = fs.readdirSync(this.device.path);
        const firmwareVersions = files.map(file => {
            const current = file.substring(file.indexOf("v") + 1, file.indexOf("."));
            return new FWVersion(current);
        });

        const deviceVersion = new FWVersion(this.device.version);
        return firmwareVersions.some(firmware => {
            if (firmware.gt(deviceVersion)) {
                this.device.newVersion = firmware.version;
                return true;
            }
            return false;
        });
    }

    getFirmwareDirectory() {
        const files = fs.readdirSync(this.device.path);
        const firmwareDirectory = files.find(file => file.includes(`${this.device.project}_v${this.device.newVersion}`));
        return `${this.device.path}/${firmwareDirectory}`;
    }

}

module.exports = new UpdateService();
