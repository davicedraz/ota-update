const app = require('../server');

const server = require('http').Server(app.server);

require('dotenv').config();

const context = {
    express: process.env.SERVER_PORT || 8001,
};

server.listen(context.express, () => {
    console.log('OTA Firmware Update Server: running at port ' + context.express);
});