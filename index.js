const { StandardBoard } = require('./src/logic/board');

function runPermutations(board, results = {}) {
  // get the valid moves
  const validMoves = board.getValidMoves();
  // if there are no valid moves, return the results
  if (validMoves.length === 0) {
    const score = board.getScore();
    if (results[score]) {
      results[score]++;
    } else {
      results[score] = 1;
    }
    return results;
  }

  // for each valid move, create a clone of the board and run the permutations
  validMoves.forEach(move => {
    const newBoard = board.clone();

    const jump = newBoard.move(move);
    
    if (!jump) {
      console.error('Error jumping');
      newBoard.printBoard()
      return;
    }
    
    runPermutations(newBoard, results);
  });

  return results;
}

function main() {
  console.log('Peg game initialized')

  const board = new StandardBoard();
  board.createBoard();
  console.log('Board created')

  let results = runPermutations(board);
  console.log(results);
}

main();