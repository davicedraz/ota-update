const express = require('express');
const multer = require('multer')

const updateCtrl = require('./controllers/UpdateController');
const deployCtrl = require('./controllers/DeployController');

const upload = require('./config/multer');

const router = express.Router();

router.post('/deploy', multer(upload).single('firmware'), deployCtrl.newFirmware);
router.get('/images/:project/:board', updateCtrl.listFirmwares);
router.get('/update/:project/:board', updateCtrl.updateDevice);

module.exports = router;