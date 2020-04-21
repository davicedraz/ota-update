const boards = require('../config/http-boards');

class BoardService {

    getBoard(type) {
        return boards[type];
    }

}

module.exports = new BoardService();