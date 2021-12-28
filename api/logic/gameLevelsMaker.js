const { EquationMaker } = require('./equiationMaker')

class GameLevelsMaker {
    constructor() {
        this.equationMaker = new EquationMaker()
    }


    #pairCalculator(num1, num2, operator) {
        let number_1 = Number(num1), number_2 = Number(num2);
        let result = 0;

        if (operator === '+')
            result = number_1 + number_2;
        else if (operator === '-')
            result = number_1 - number_2;
        else if (operator === '*')
            result = number_1 * number_2;
        else 
            result = number_1 / number_2;

        if(!Number.isInteger(result)) result = Number(result.toFixed(2));

        return result;
    }

    #equiationSplitter(operator, element) {
        let operator_splitter = ` ${operator} `;
        let splittedByOperator = element.split(operator_splitter);
        let result = 0;
        if(splittedByOperator.length > 1) {
            let number_1 = splittedByOperator[0];
            let number_2 = splittedByOperator[1];
            let equation_type = splittedByOperator.some(item => !Number.isInteger(+item));
            
            if(!equation_type) {
                result = this.#pairCalculator(number_1, number_2, operator);

                if(Number(splittedByOperator[2])) 
                    result = this.#pairCalculator(result, splittedByOperator[2], operator);
            } else {
                let subCalculate = !Number(number_1) ? number_1.split(' ') : number_2.split(' ');
                let unitValue = Number(number_1) ? number_1 : number_2;
                let second_result = this.#pairCalculator(subCalculate[0], subCalculate[2], subCalculate[1]);

                result = this.#pairCalculator(unitValue, second_result,operator)
            }

            return {result, ok: true};
        }

        return {result, ok: false}
    }

    #equationSolver(element) {
        let r = {};
        let operator = ['+','-','*', '/'];
        let i = 0;

        do {
            r = this.#equiationSplitter(operator[i], element);
            i++;
        } while (!r.ok);

        return r.result;
    }

    #createLevelValues(values) {
        let level = [];
        let { cards, elements, start, limit, variables} = values

        if(!Array.isArray(elements)) {

            for (let index = 0; index < cards; index++) {

                let value = this.equationMaker.createEquation(elements, start, limit, variables);
                level.push({value, result: this.#equationSolver(value)});
            
            }
        } else {
            let cards_half = cards / 2;

            for(let i = 0; i < elements.length; i++) {
                for (let index = 0; index < cards_half; index++) {

                    let value = this.equationMaker.createEquation(elements[i], start, limit, variables);
                    level.push({value, result: this.#equationSolver(value)});
                
                }
            }
        }

        return level;
    }

    createValuesGroup(stage, values) {
        let levels_group = [];

        for(let i = 0; i < stage; i++) {
            let level = this.#createLevelValues(values);
            levels_group.push(level)
        }

        return levels_group;
    }
}


module.exports = { GameLevelsMaker }