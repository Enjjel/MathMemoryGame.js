const { MathMemory } = require('../logic/mathMemory');
const mathMemory = new MathMemory();

exports.getNumbers = (req, res) => {
    let { difficulty, board_cards } = req.query;
    res.json({cards: mathMemory.generateValues(difficulty, board_cards)})
}