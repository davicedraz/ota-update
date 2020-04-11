const app = require('./src/server');

const server = require('http').Server(app.server);

require('dotenv').config();

const context = {
    express: process.env.SERVER_PORT || 3000,
};

server.listen(context.express, () => {
    console.log('OTA Firmware Update Server: running at port ' + context.express);
});