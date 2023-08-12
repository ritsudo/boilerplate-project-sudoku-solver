const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
	test("Solve a puzzle with valid puzzle string: POST request to /api/solve", function(done) {
		chai
			.request(server)
			.post("/api/solve")
			.send({
				puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
			})
			.end(function(err,res){
				assert.equal(res.status, 200)
				assert.equal(res.body.solution, "769235418851496372432178956174569283395842761628713549283657194516924837947381625")
				done();
			})
	})
	
//  
//  Solve a puzzle with missing puzzle string: POST request to /api/solve
//  Solve a puzzle with invalid characters: POST request to /api/solve
//  Solve a puzzle with incorrect length: POST request to /api/solve
//  Solve a puzzle that cannot be solved: POST request to /api/solve
//  Check a puzzle placement with all fields: POST request to /api/check
//  Check a puzzle placement with single placement conflict: POST request to /api/check
//  Check a puzzle placement with multiple placement conflicts: POST request to /api/check
//  Check a puzzle placement with all placement conflicts: POST request to /api/check
//  Check a puzzle placement with missing required fields: POST request to /api/check
//  Check a puzzle placement with invalid characters: POST request to /api/check
//  Check a puzzle placement with incorrect length: POST request to /api/check
//  Check a puzzle placement with invalid placement coordinate: POST request to /api/check
//  Check a puzzle placement with invalid placement value: POST request to /api/check

});

