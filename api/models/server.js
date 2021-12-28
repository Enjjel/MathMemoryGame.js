const express = require('express');
const cors = require('cors');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.paths = {
			game: '/game'
		}

		this.middleWares();
		this.routes();
	}

	middleWares() {
		this.app.use(cors());
		this.app.use(express.json());

	}

	routes() {
		this.app.use(this.paths.game, require('../routes/game'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Listening on port ${this.port}`);
		})
	}

}

module.exports = {Server}