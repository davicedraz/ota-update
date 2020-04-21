const deployService = require('../services/deploy-service');

class DeployController {

    static newFirmware(req, res) {
        return deployService.deploy(req.file)
            .then(result => {
                res.status(result.status).send(result.firmware);
            }).catch(error => res.status(error.status).json(error.message));
    }

}

module.exports = DeployController;