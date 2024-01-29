/**
 * @class Space
 * @param {number} id The id of the space
 * @description A space on the board
 * @property {number} id The id of the space
 * @property {number[]} adjacent The adjacent spaces
 * @property {[{ jump: number, land: number}]} targets The spaces that can be reached from the current space
 * @property {number[]} targetedBy The spaces that can target the current space
 * @property {boolean} occupied Whether the space is occupied
 * @method {boolean} isOccupied Returns whether the space is occupied
 * @method {void} fill Fills the space
 * @method {void} empty Empties the space
 * @method {void} addAdjacent Adds a space as adjacent to the current space
 * @method {Space[]} getAdjacent Returns the adjacent spaces
 * @method {void} setTarget Sets the space as target
 * @method {[{ jump: Space, land: Space}]} getTargets Returns the targets for the space
 * @method {void} setTargetedBy Adds a space as targeted
 * @method {Space[]} getTargetedBy Returns spaces that can target the current space
 */
class Space {
  constructor(id) {
    this.id = id
    this.adjacent = []
    this.targets = []
    this.targetedBy = []
    this.occupied = false
  }

  /**
   * @returns {boolean} Whether the space is occupied
   * @description Returns whether the space is occupied
   * @memberof Space
   * @method
   * @name isOccupied
   */
  isOccupied() {
    return this.occupied
  }

  /**
   * @description Fills the space
   * @returns {void}
   * @memberof Space
   * @method
   * @name fill
   */
  fill() {
    this.occupied = true
  }

  /**
   * @description Empties the space
   * @returns {void}
   * @memberof Space
   * @method
   * @name empty
   */
  empty() {
    this.occupied = false
  }

  /**
   * @param {string} space The space to add as adjacent
   * @description Adds a space as adjacent to the current space
   * @returns {void}
   * @memberof Space
   * @method
   * @name addAdjacent
   */
  addAdjacent(space) {
    this.adjacent.push(space)
  }

  /**
   * @returns {string[]} The adjacent spaces
   * @description Returns the adjacent spaces
   * @memberof Space
   * @method
   * @name getAdjacent
  */
  getAdjacent() {
    return this.adjacent
  }

 /**
  * @param {string} jump The space to jump to
  * @param {string} land The space to land on
  * @returns {void}
  * @description Sets the space as target
  * @memberof Space
  * @method
  */
  addTarget(jump, land) {
    this.targets.push({ jump, land })
  }

  /**
   * @returns {[{ jump: string, land: string}]} The targets
   * @description Returns the targets for the space
   * @memberof Board
   * @method
   * @name getTargets
   */
  getTargets() {
    return this.targets
  }

  /**
   * @param {string} space The space to add as targeted
   * @returns {void}
   * @description Adds a space as targeted
   * @memberof Space
   * @method
   * @name addTargeted
   */
  addTargetedBy(space) {
    this.targetedBy.push(space)
  }

  /**
   * @returns {string[]} The targeted spaces
   * @description Returns spaces that can target the current space
   * @memberof Space
   * @method
   * @name getTargetedBy
   */
  getTargetedBy() {
    return this.targetedBy
  }
}

/**
 * @class Board
 * @description A board
 * @property {object} spaces The spaces on the board
 * @method {Space} getSpace Returns the space with the given id
 * @method {void} addSpace Adds a space to the board
 * @method {Space[]} getSpaces Returns the spaces on the board
 * @method {void} setAdjacent Sets the two spaces as adjacent
 */
class Board {
  constructor() {
    this.spaces = {}
  }

  /**
   * @param {number} id The id of the space
   * @returns {Space} The space
   * @description Returns the space with the given id
   * @memberof Board
   * @method
   * @name getSpace
   */
  getSpace(id) {
    return this.spaces[id]
  }

  /**
   * @param {Space} space The space to add
   * @returns {void}
   * @description Adds a space to the board
   * @memberof Board
   * @method
   * @name addSpace
   */
  addSpace(space) {
    this.spaces[space.id] = space
  }

  /**
   * @returns {Space[]} The spaces on the board
   * @description Returns the spaces on the board
   * @memberof Board
   * @method
   * @name getSpaces
   */
  getSpaces() {
    return this.spaces
  }

  /**
   * @param {Space} space The space to set as occupied
   * @returns {void}
   * @description Sets the space as occupied
   * @memberof Board
   * @method
   * @name setOccupied
   */
  setOccupied(space) {
    space.fill()
  }

  /**
   * @param {Space} space The space to set as empty
   * @returns {void}
   * @description Sets the space as empty
   * @memberof Board
   * @method
   * @name setEmpty
   */
  setEmpty(space) {
    space.empty()
  }

  /**
   * @param {Space} firstSpace The first space
   * @param {Space} secondSpace The second space
   * @returns {void}
   * @description Sets the two spaces as adjacent
   * @memberof Board
   * @method
   * @name setAdjacent
   */
  setAdjacent(firstSpace, secondSpace) {
    firstSpace.addAdjacent(secondSpace.id)
    secondSpace.addAdjacent(firstSpace.id)
  }

  /**
   * @param {Space} space The space to set targets for
   * @param {Space} jumpSpace The space to jump to
   * @param {Space} landSpace The space to land on
   * @returns {void}
   * @description Sets spaces as targets for each other
   * @memberof Board
   * @method
   * @name setTarget
   */
  addTarget(space, jumpSpace, landSpace) {
    space.addTarget(jumpSpace.id, landSpace.id)
    space.addTargetedBy(landSpace.id)
    landSpace.addTarget(jumpSpace.id, space.id)
    landSpace.addTargetedBy(space.id)
  }

  /**
   * @param {Space} space The space to validate jump for
   * @param {Space} target The space to jump to
   * @returns {boolean} Whether the jump is valid
   * @description Validates the jump
   * @memberof Board
   * @method
   * @name validateJump
   */
  validateJump(space, target) {
    const spaceIsOccupied = space.isOccupied()
    const spaceTargets = space.getTargets()
    const targetId = target.id
    const isValidTarget = spaceTargets.find(space => space.land === targetId) !== undefined
    const isTargetEmpty = !target.isOccupied()
    const jumpSpaceId = spaceTargets.find(space => space.land === targetId).jump
    /**
     * @type {Space}
     */
    const jumpSpace = this.getSpace(jumpSpaceId);
    const isJumpSpaceOccupied = jumpSpace.isOccupied()

    return spaceIsOccupied && isValidTarget && isTargetEmpty && isJumpSpaceOccupied
  }

  /**
   * @param {Space} space The space to jump from
   * @param {Space} target The space to jump to
   * @returns {boolean} Whether the jump was successful
   * @description Jumps from one space to another
   * @memberof Board
   * @method
   * @name jump
   */
  jump(space, target) {
    const isValidJump = this.validateJump(space, target)
    /** 
     * @type {Space}
     */
    const jumpSpace = this.getSpace(space.getTargets().find(space => space.land === target.id).jump)

    if (isValidJump) { 
      this.setEmpty(space)
      this.setEmpty(jumpSpace)
      this.setOccupied(target)
      return true;
    }

    console.error('Invalid jump')
    return false;
  }

  /**
   * @returns {Space[]} The empty spaces
   * @description Returns the empty spaces
   * @memberof Board
   * @method
   * @name getEmptySpaces
   */
  getEmptySpaces() {
    const emptySpaces = []
    const spaces = this.getSpaces()

    for (const space in spaces) {
      if (!spaces[space].isOccupied()) {
        emptySpaces.push(spaces[space])
      }
    }

    return emptySpaces
  }

  /**
   * @param {Space[]} spaces The spaces to set
   * @returns {void}
   * @description Sets the spaces
   * @memberof Board
   * @method
   * @name setSpaces
   */
  setSpaces(spaces) {
    this.spaces = spaces
  }

  /**
   * @returns {[{ jump: Space, land: Space}]} The valid moves
   * @description Returns the valid moves
   * @memberof Board
   * @method
   * @name getValidMoves
   */
  getValidMoves() {
    const emptySpaces = this.getEmptySpaces()
    const validMoves = []

    // For each empty space, check if which spaces are targeting it
    for (const emptySpace of emptySpaces) {
      const targetedBy = emptySpace.getTargetedBy()

      // For each space targeting the empty space, check if the jump is valid
      for (const targetingSpace of targetedBy) {
        const isValidJump = this.validateJump(this.getSpace(targetingSpace), emptySpace)

        if (isValidJump) {
          // Only push the jump if there isn't already an identical jump
          const alreadyExists = validMoves.find(move => move.jump === targetingSpace && move.land === emptySpace.id) !== undefined
          if (!alreadyExists) {
            validMoves.push({ jump: targetingSpace, land: emptySpace.id })
          }
        }
      }
    }

    return validMoves
  }
}

/**
 * @class StandardBoard
 * @extends Board
 * @property {[]} history The history of moves
 * @description A standard board
 * @method {void} createBoard Creates the board
 */
class StandardBoard extends Board{
  constructor() {
    super()
    this.history = []
  }

  /**
   * @description Creates the standard board
   * @returns {void}
   * @memberof StandardBoard
   * @method
   * @name createBoard
   */
  createBoard() {
    // A standard board has 15 spaces and is triangle shaped with 5 spaces on the bottom row and 1 space on the top row
    // The spaces are numbered from 1 to 15 starting from the top left and going left to right, top to bottom

    // Create the spaces
    for (let i = 0; i < 15; i++) {
      // 1 index the spaces to match most available diagrams
      const space = new Space(i + 1)
      this.addSpace(space)
    }
    
    // Fill spaces 2 through 15
    for (let i = 2; i < 16; i++) {
      this.setOccupied(this.getSpace(i))
    }

    // Define adjacent spaces
  
    // First row
    // 1 is adjacent to 2 and 3
    this.setAdjacent(this.getSpace(1), this.getSpace(2))
    this.setAdjacent(this.getSpace(1), this.getSpace(3))

    // Second row
    // 2 is adjacent to 1, 3, 4, and 5
    this.setAdjacent(this.getSpace(2), this.getSpace(3))
    this.setAdjacent(this.getSpace(2), this.getSpace(4))
    this.setAdjacent(this.getSpace(2), this.getSpace(5))
    // 3 is adjacent to 1, 2, 5, and 6
    this.setAdjacent(this.getSpace(3), this.getSpace(5))
    this.setAdjacent(this.getSpace(3), this.getSpace(6))

    // Third row
    // 4 is adjacent to 2, 5, 7, and 8
    this.setAdjacent(this.getSpace(4), this.getSpace(5))
    this.setAdjacent(this.getSpace(4), this.getSpace(7))
    this.setAdjacent(this.getSpace(4), this.getSpace(8))
    // 5 is adjacent to 2, 3, 4, 6, 8, and 9
    this.setAdjacent(this.getSpace(5), this.getSpace(6))
    this.setAdjacent(this.getSpace(5), this.getSpace(8))
    this.setAdjacent(this.getSpace(5), this.getSpace(9))
    // 6 is adjacent to 3, 5, 9, and 10
    this.setAdjacent(this.getSpace(6), this.getSpace(9))
    this.setAdjacent(this.getSpace(6), this.getSpace(10))

    // Fourth row
    // 7 is adjacent to 4, 8, 11, and 12
    this.setAdjacent(this.getSpace(7), this.getSpace(8))
    this.setAdjacent(this.getSpace(7), this.getSpace(11))
    this.setAdjacent(this.getSpace(7), this.getSpace(12))
    // 8 is adjacent to 4, 5, 7, 9, 12, and 13
    this.setAdjacent(this.getSpace(8), this.getSpace(9))
    this.setAdjacent(this.getSpace(8), this.getSpace(12))
    this.setAdjacent(this.getSpace(8), this.getSpace(13))
    // 9 is adjacent to 5, 6, 8, 10, 13, and 14
    this.setAdjacent(this.getSpace(9), this.getSpace(10))
    this.setAdjacent(this.getSpace(9), this.getSpace(13))
    this.setAdjacent(this.getSpace(9), this.getSpace(14))
    // 10 is adjacent to 6, 9, 14, and 15
    this.setAdjacent(this.getSpace(10), this.getSpace(14))
    this.setAdjacent(this.getSpace(10), this.getSpace(15))

    // Fifth row
    // 11 is adjacent to 7 and 12
    this.setAdjacent(this.getSpace(11), this.getSpace(12))
    // 12 is adjacent to 7, 8, 11, 13
    this.setAdjacent(this.getSpace(12), this.getSpace(13))
    // 13 is adjacent to 8, 9, 12, 14
    this.setAdjacent(this.getSpace(13), this.getSpace(14))
    // 14 is adjacent to 9, 10, 13, 15
    this.setAdjacent(this.getSpace(14), this.getSpace(15))
    // 15 is adjacent to 10 and 14 but these have already been set

    // Define targets

    // First row
    // 1 can over 2 to 4 and 3 to 6
    this.addTarget(this.getSpace(1), this.getSpace(2), this.getSpace(4))
    this.addTarget(this.getSpace(1), this.getSpace(3), this.getSpace(6))

    // Second row
    // 2 can jump over 4 to 7 and 5 to 9
    this.addTarget(this.getSpace(2), this.getSpace(4), this.getSpace(7))
    this.addTarget(this.getSpace(2), this.getSpace(5), this.getSpace(9))
    // 3 can jump over 5 to 8 and 6 to 10
    this.addTarget(this.getSpace(3), this.getSpace(5), this.getSpace(8))
    this.addTarget(this.getSpace(3), this.getSpace(6), this.getSpace(10))

    // Third row
    // 4 can jump over 2 to 1, 5 to 6, 7 to 11, and 8 to 13
    this.addTarget(this.getSpace(4), this.getSpace(5), this.getSpace(6))
    this.addTarget(this.getSpace(4), this.getSpace(7), this.getSpace(11))
    this.addTarget(this.getSpace(4), this.getSpace(8), this.getSpace(13))
    // 5 can jump over 8 to 12 and 9 to 14
    this.addTarget(this.getSpace(5), this.getSpace(8), this.getSpace(12))
    this.addTarget(this.getSpace(5), this.getSpace(9), this.getSpace(14))
    // 6 can jump over 3 to 1, 5 to 4, 9 to 13, and 10 to 15
    this.addTarget(this.getSpace(6), this.getSpace(5), this.getSpace(4))
    this.addTarget(this.getSpace(6), this.getSpace(9), this.getSpace(13))
    this.addTarget(this.getSpace(6), this.getSpace(10), this.getSpace(15))

    // Fourth row
    // 7 can jump over 4 to 2 and 8 to 9
    this.addTarget(this.getSpace(7), this.getSpace(8), this.getSpace(9))
    // 8 can jump over 5 to 3 and 9 to 10
    this.addTarget(this.getSpace(8), this.getSpace(9), this.getSpace(10))
    // 9 can jump over 5 to 2 and 8 to 7 but these have already been set
    // 10 can jump over 6 to 3 and 9 to 8 but these have already been set

    // Fifth row
    // 11 can jump over 7 to 4 and 12 to 13
    this.addTarget(this.getSpace(11), this.getSpace(12), this.getSpace(13))
    // 12 can jump over 8 to 5 and 13 to 14
    this.addTarget(this.getSpace(12), this.getSpace(13), this.getSpace(14))
    // 13 can jump over 8 to 4, 9 to 5, 12 to 11, and 14 to 15
    this.addTarget(this.getSpace(13), this.getSpace(14), this.getSpace(15))
    // 14 can jump over 9 to 5 and 13 to 12 but these have already been set
    // 15 can jump over 10 to 6 and 14 to 13 but these have already been set
  }

  /**
   * @description Prints the board
   * @returns {void}
   * @memberof StandardBoard
   * @method
   * @name printBoard
   */
  printBoard() {
    console.log(this.toString())
  }

  /**
   * @description Returns the board as a string
   * @returns {string} The board as a string
   * @memberof StandardBoard
   * @method
   * @name toString
   */
  toString() {
    const spaces = this.getSpaces()
    const emptySpace = 'O'
    const occupiedSpace = '*'
    const space = ' '

    const spaceStatuses = {}

    for (const space in spaces) {
      spaceStatuses[space] = spaces[space].isOccupied() ? occupiedSpace : emptySpace
    }

    // First row
    let board = space.repeat(4) + spaceStatuses[1] + space.repeat(4) + '\n'

    // Second row
    board += space.repeat(3) + spaceStatuses[2] + space.repeat(1) + spaceStatuses[3] + space.repeat(3) + '\n'

    // Third row
    board += space.repeat(2) + spaceStatuses[4] + space.repeat(1) + spaceStatuses[5] + space.repeat(1) + spaceStatuses[6] + space.repeat(2) + '\n'

    // Fourth row
    board += space.repeat(1) + spaceStatuses[7] + space.repeat(1) + spaceStatuses[8] + space.repeat(1) + spaceStatuses[9] + space.repeat(1) + spaceStatuses[10] + space.repeat(1) + '\n'

    // Fifth row
    board += spaceStatuses[11] + space.repeat(1) + spaceStatuses[12] + space.repeat(1) + spaceStatuses[13] + space.repeat(1) + spaceStatuses[14] + space.repeat(1) + spaceStatuses[15]

    return board
  }

  /**
   * @returns {number} The score
   * @description Returns the score
   * @memberof StandardBoard
   * @method
   * @name getScore
   */
  getScore() {
    const emptySpaces = this.getEmptySpaces()
    const occupiedSpaces = 15 - emptySpaces.length
    return occupiedSpaces
  }

  /**
   * @returns {string[]} The history of moves
   * @description Returns the history of moves
   * @memberof StandardBoard
   * @method
   * @name getHistory
   */
  getHistory() {
    return this.history
  }

  /**
   * @param {string} move The move to add to the history
   * @returns {void}
   * @description Adds a move to the history
   * @memberof StandardBoard
   * @method
   * @name addHistory
   */
  addHistory(move) {
    this.history.push(move)
  }

  /**
   * @param {string} move The move to make
   * @returns {boolean} Whether the move was successful
   * @description Makes a move while adding it to the history
   * @memberof StandardBoard
   * @method
   * @name move
   */
  move(move) {
    const jumpSpace = this.getSpace(move.jump)
    const landSpace = this.getSpace(move.land)

    const jump = this.jump(jumpSpace, landSpace)
    if (!jump) {
      return false
    }
    this.addHistory(this.toString())
    return true
  }

  /**
   * @returns {StandardBoard} The cloned board
   * @description Clones the board
   * @memberof StandardBoard
   * @method
   * @name clone
   */
  clone() {
    const board = new StandardBoard()
    board.createBoard()

    const spaces = this.getSpaces()

    // look up each space in the new board and set it to the same occupied status
    for (const space in spaces) {
      const newSpace = board.getSpace(space)
      const oldSpace = spaces[space]

      if (oldSpace.isOccupied()) {
        board.setOccupied(newSpace)
      } else {
        board.setEmpty(newSpace)
      }
    }

    return board
  }
}

module.exports = {
  Board,
  StandardBoard,
}

// Path: src/logic/game.js
