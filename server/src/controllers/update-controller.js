const updateService = require('../services/update-service');

const moment = require('moment');

class UpdateController {

    static updateDevice(req, res) {
        const { board, project } = req.params;
        console.log(`Device ${req.connection.remoteAddress} request firmware at ${moment().format()}`);
        return updateService.lastestFirmwareVersion(board, project, req.headers)
            .then(result => {
                res.status(result.status).download(result.firmware);
            }).catch(error => res.status(error.status).json(error.message));
    }

    static listFirmwares(req, res) {
        const { board, project } = req.params;
        return updateService.listAllFirmwares(board, project, req.headers)
            .then(result => {
                res.status(result.status).send(result.firmwares);
            }).catch(error => res.status(error.status).json(error.message));
    }

    

}

module.exports = UpdateController;
