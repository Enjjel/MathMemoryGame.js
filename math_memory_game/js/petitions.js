const getBoardValues = async (difficulty, board_cards) => {
    const result = await fetch(`http://localhost:4000/game?difficulty=${difficulty}&board_cards=${board_cards}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    });

    let values = await result.json();

    return values;
}

export { getBoardValues }