require('dotenv').config();

const app = require('../server/src');
const server = require('http').Server(app.server);

const context = {
    express: process.env.SERVER_PORT || 8001,
};

server.listen(context.express, () => {
    console.log('OTA Firmware Update Server: running at port ' + context.express);
});