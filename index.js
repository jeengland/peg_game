const { StandardBoard } = require('./src/logic/board');

function main() {
  console.log('Peg game initialized')

  const board = new StandardBoard();
  board.createBoard();
  console.log('Board created')

  let validMoves = board.getValidMoves();
  console.log('Valid moves generated')

  while (validMoves.length > 0) {
    const jump = board.jump(validMoves[0].jump, validMoves[0].land);

    // if (!jump) {
    //   board.printBoard();
    //   break;
    // }

    // else {
    //   board.printBoard();
    // }

    validMoves = board.getValidMoves();
  }

  board.printBoard();
  
  const score = board.getScore();
  console.log(`Score: ${score}`);

  if (score === 1) {
    console.log("You're genius!")
  } else if (score === 2) {
    console.log("You're purty smart.")
  } else if (score === 3) {
    console.log("You're just plain dumb.")
  } else {
    console.log("You're just plain 'eg-no-ra-moose.")
  }
}

main();