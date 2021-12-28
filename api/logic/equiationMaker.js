class EquationMaker {
    constructor(){}

    #getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min) + min);
    }

    createEquation(elements, start, limit, variables) {
        let equation = '';
        let operators = ['+', '-', '/', '*'];

        for(let i = 0; i < elements; i++) {
            equation = i === 0 ? equation + this.#getRandomInt(start, limit) : equation = equation + ' ' + this.#getRandomInt(start, limit);

            if(i < elements - 1) equation = equation + ' ' + operators[this.#getRandomInt(0, 4)];
        }

        return equation;
    }
}

module.exports = { EquationMaker }