const { GameLevelsMaker } = require('./gameLevelsMaker')

class MathMemory {
    constructor() {
        this.gameLevelsMaker = new GameLevelsMaker()
    }

    #difficultyValuesGenerator(cards, elements, start, limit, variables) {
        return {
            cards,
            elements,
            start,
            limit,
            variables
        }
    }

    #difficultyManager(difficulty, cards) {
        const stages = [3,3,4]
        const difficulty_array = [
            [//easy
                this.#difficultyValuesGenerator(cards, 2, 0, 10),
                this.#difficultyValuesGenerator(cards, 2, 0, 20),
                this.#difficultyValuesGenerator(cards, [2, 3], 1, 20)
            ],
            [//medium
                this.#difficultyValuesGenerator(cards, 2, 2, 10),
                this.#difficultyValuesGenerator(cards, 3, 2, 20),
                this.#difficultyValuesGenerator(cards, 3, 2, 30)
            ],
            [//hard
                this.#difficultyValuesGenerator(cards, 3, 5, 10),
                this.#difficultyValuesGenerator(cards, 3, 5, 30),
                this.#difficultyValuesGenerator(cards, 3, 5, 50)
            ]
        ];

        let board = []

        for(let i = 0; i < 3; i++) {
            board = board.concat(this.gameLevelsMaker.createValuesGroup(stages[i], difficulty_array[difficulty][i]));
        }

        return board;
    }

    generateValues(difficulty, board_items) {
        let array = [];
        const cards = board_items / 2;

        array = this.#difficultyManager(difficulty, cards);

        return array;
    }
}

module.exports = { MathMemory }