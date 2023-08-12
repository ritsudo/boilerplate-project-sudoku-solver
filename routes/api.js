'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
		if (!req.body) {
			res.json({error: 'Invalid request'})
		} else {
			res.json(solver.validate(req.body))
		}
    });
    
  app.route('/api/solve')
    .post((req, res) => {
		if (!req.body.puzzle) {
			res.json({error: 'Required field missing'});
		} else {
			res.json(solver.solve(req.body.puzzle))
		}
    });
};
