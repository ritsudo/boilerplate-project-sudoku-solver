class SudokuSolver {

  checkisAcceptable(sudokuBoard, inpRow, inpCol, inpVal) {
	  
	  
function getRowColRegIndex(index) {
  let row = Math.floor(index/9);
  let col = index%9;
  let r1 = Math.floor(row/3)*3;
  let c1 = Math.floor(col/3);

  return {
    row: row,
    col: col,
    reg: r1+c1
  }
}

function getIndexFromRowCol(row, col) {
  return row * 9 + col;
}

function getIndexFromReg(reg, numberInReg) {
  let r1 = reg%3;
  let r2 = Math.floor(reg/3);
  let c1 = Math.floor(numberInReg/3);
  let c2 = numberInReg%3;
  return (9*3*r2) + (3*r1) + (9*c1) + c2;
}

function getRowColReg(index) {
  let {row, col, reg} = getRowColRegIndex(index);
  let rowArr = [];
  for (let r = 0; r < 9; r+=1) {
    rowArr.push(sudokuBoard[getIndexFromRowCol(row, r)]);
  }
  let colArr = [];
  for (let c = 0; c < 9; c+=1) {
    colArr.push(sudokuBoard[getIndexFromRowCol(c, col)]);
  }
  let regArr = [];
  for (let rg = 0; rg < 9; rg+=1) {
    regArr.push(sudokuBoard[getIndexFromReg(reg, rg)]);
  }
  
  return {row: rowArr, col: colArr, reg: regArr};
}

function isAcceptable(index, strValue) {
	let value = parseInt(strValue)

  let {row, col, reg} = getRowColReg(index);
  let rowAcceptable = true, colAcceptable = true, regAcceptable = true;
  for (let i = 0; i < 9; i += 1) {
    if (row[i] == value) {
      rowAcceptable = false;
    }
  }
  for (let i = 0; i < 9; i += 1) {
    if (col[i] == value) {
      colAcceptable = false;
    }
  }
  for (let i = 0; i < 9; i += 1) {
    if (reg[i] == value) {
      regAcceptable = false;
    }
  }
  return {rowAcceptable: rowAcceptable, colAcceptable: colAcceptable, regAcceptable: regAcceptable};
}

	let newIndex = getIndexFromRowCol(inpRow, inpCol)
	
	if (sudokuBoard[newIndex] == inpVal) {
		return {rowAcceptable: true, colAcceptable: true, regAcceptable: true}
	}

	return isAcceptable(newIndex, inpVal)

  }

  getSudokuSolution(inputSudokuString) {
  let board = []

  const indexToRowCol = (index) => { 
    return {row: Math.floor(index/9), col: index%9} 
	}

  const RowColToindex = (row, col) => (row * 9 + col)

  const acceptable = (board, index, value) => {
    let { row, col } = indexToRowCol(index)
    for (let r = 0; r < 9; ++r) {
        if (board[RowColToindex(r, col)] == value) return false
    }
    for (let c = 0; c < 9; ++c) {
        if (board[RowColToindex(row, c)] == value) return false
    }

    let r1 = Math.floor(row / 3) * 3
    let c1 = Math.floor(col / 3) * 3
    for (let r = r1; r < r1 + 3; ++r) {
        for (let c = c1; c < c1 + 3; ++c) {
            if (board[RowColToindex(r, c)] == value) return false
        }
    }
    return true
}

  const getChoices = (board, index) => {
    let choices = []
    for (let value = 1; value <= 9; ++value) {
        if (acceptable(board, index, value)) {
            choices.push(value)
        }
    }
    return choices
}

  const bestBet = (board) => {
    let index, moves, bestLen = 100
    for (let i = 0; i < 81; ++i) {
        if (!board[i]) {
            let m = getChoices(board, i)
            if (m.length < bestLen) {
                bestLen = m.length
                moves = m
                index = i
                if (bestLen == 0) break
            }
        }
    }
    return { index, moves }
}

  const solve = () => {
    let { index, moves } = bestBet(board) 
    if (index == null) return true          
    for (let m of moves) {
        board[index] = m
        exportString()
        if (solve()) return true        
    }
    board[index] = 0
    return false
}

  function loadBoard(sudokuStr) {
  let sudokuArr = sudokuStr.split("");
  for (let i = 0; i < sudokuArr.length; i+=1) {
    if(sudokuArr[i] == ".") {
      board.push("")
    } else {
      board.push(sudokuArr[i]);
    }
  }
}

 function exportString() {
  let exportArr = []
  for (let i = 0; i < 81; i+=1) {
    if (board[i] == "" || board[i] == 0) {
      exportArr.push(".");
    } else {
      exportArr.push(board[i]);
    }
  }
  let result = exportArr.join("");
  return result;
}
  
  
  
  loadBoard(inputSudokuString);
  let isSolved = solve();
  let solution = "";
  solution = exportString();
  
  return [isSolved, solution];
}

  coordinateToRowCol(coordinate) {
	  
	function getRowPos(innerInputLetter) {
		return(innerInputLetter.charCodeAt(0) - 65)
	}
	
	function getColPos(inputDigit) {
		return(inputDigit - 1);
	};
	
	if (coordinate.length !== 2 ||!/[A-I]/.test(coordinate[0]) || !/[1-9]/.test(coordinate[1])) {
		return false
	}
	
	return {rowPos: getRowPos(coordinate[0]), colPos: getColPos(coordinate[1])}
  }

  validate(puzzleArr) {
	  if (!puzzleArr) {
		  return {error: "Invalid request"}
	  }
	  
	  if (!puzzleArr.puzzle || !puzzleArr.coordinate || !puzzleArr.value) {
		  return {error: 'Required field(s) missing'}
	  }
	  
	  if (this.validatePuzzleString(puzzleArr.puzzle) !== true) {
		  return this.validatePuzzleString(puzzleArr.puzzle);
	  }
	  
	  if (!this.coordinateToRowCol(puzzleArr.coordinate)) {
		  return  { error: 'Invalid coordinate'}
	  }
	  
	  if ( /[^0-9]/.test(puzzleArr.value) || puzzleArr.value < 1 || puzzleArr.value > 9) {
		  return { error: 'Invalid value' }
	  }
	  
	  let {rowPos, colPos} = this.coordinateToRowCol(puzzleArr.coordinate)
	  
	  let {rowAcceptable, colAcceptable, regAcceptable} = this.checkisAcceptable(puzzleArr.puzzle, rowPos, colPos, puzzleArr.value)
	  
	  if (rowAcceptable && colAcceptable && regAcceptable) {
		  return { valid: true }
	  } else {
		  let conflictArr = []
		  if (!rowAcceptable) {conflictArr.push("row")}
		  if (!colAcceptable) {conflictArr.push("column")}
		  if (!regAcceptable) {conflictArr.push("region")}
		  return { valid: false, conflict: conflictArr }
	  }
	  
	  return 0
  }
	
  validatePuzzleString(puzzleString) {
		let numDotRegex = /[^0-9.]/g
	  
		if (numDotRegex.test(puzzleString)) {
			return {error: "Invalid characters in puzzle"}
		}
	  
		if (puzzleString.length !== 81) {
			return {error: 'Expected puzzle to be 81 characters long'}
		}
		
		return true
  }

  solve(puzzleString) {
		if (this.validatePuzzleString(puzzleString) !== true) {
			return this.validatePuzzleString(puzzleString);
		}
	  
		let res = this.getSudokuSolution(puzzleString);
		if (res[0] == true) {
			return {solution: res[1]}
		} else {
			return {error: "Puzzle cannot be solved"}
		}
	  
  }
}

module.exports = SudokuSolver;

