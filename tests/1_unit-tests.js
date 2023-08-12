const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const puzzlesAndSolutions = require('../controllers/puzzle-strings.js');
let solver = new Solver();

suite('Unit Tests', () => {
    test("Logic handles a valid puzzle string of 81 characters", function() {
		let testResult = solver.solve(puzzlesAndSolutions.puzzlesAndSolutions[0][0])
		assert.equal(testResult.solution, puzzlesAndSolutions.puzzlesAndSolutions[0][1]);
    });
	test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function() {
		let testResult = solver.solve('1.5..2.84..63.12.7.2..5.....9..1.,..8.2.3674.3.7.2..9.47...8..1..16....926914.37.')
		assert.equal(testResult.error, 'Invalid characters in puzzle');
    });
	test("Logic handles a puzzle string that is not 81 characters in length", function() {
		let testResult = solver.solve('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.')
		assert.equal(testResult.error, 'Expected puzzle to be 81 characters long');
    });
//    
//    
//    
//    Logic handles a valid row placement
//    Logic handles an invalid row placement
//    Logic handles a valid column placement
//    Logic handles an invalid column placement
//    Logic handles a valid region (3x3 grid) placement
//    Logic handles an invalid region (3x3 grid) placement
//    Valid puzzle strings pass the solver
//    Invalid puzzle strings fail the solver
//    Solver returns the expected solution for an incomplete puzzle

});
