const boards = require('../config/boards');

class BoardService {

    getBoard(type) {
        return boards[type];
    }

}

module.exports = new BoardService();