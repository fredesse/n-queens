/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = [];

  var myBoard = new Board({n: n});

  var searchBoard = function(row, col) {
    myBoard.togglePiece(row, col);
    if (myBoard.hasAnyRooksConflicts()) {
      myBoard.togglePiece(row, col);
      if (col + 1 < n) {
        searchBoard(row, col + 1)
      } else {
        searchBoard(row + 1, 0);
      }
    } else {
      if (row + 1 < n) {
        searchBoard(row + 1, 0);
      }
    }
  }

  for (var i = 0; i < n; i++) {
    solution.push(myBoard.attributes[i]);
  }
  searchBoard(0, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var myBoard = new Board({n: n});

  var findSolution = function(row) {

    // if all rows exhausted
    if (row === n) {
      // increment solutionCount
      solutionCount++;
        //stop
        return;
    }

    //iterate over possible solutions
    for (var i = 0; i < n; i++) {
      //place a piece
      myBoard.togglePiece(row, i);
      if (!myBoard.hasAnyRooksConflicts()) {
        //recurse into remaining problem
        findSolution(row + 1);
      }      //unplace a piece
      myBoard.togglePiece(row, i);
    }

  }

  findSolution(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  //create new board times n
  var myBoard = new Board({n:n});

  //create a function to search rows
  var searchBoard = function(row) {
    //check every place on row
    for (var colIndex = 0; colIndex < n; colIndex++) {
      //in each one place a queen
      myBoard.togglePiece(row, colIndex);
      //check if there are conflicts
      if (myBoard.hasAnyQueensConflicts()) {
        //if yes then move on
        myBoard.togglePiece(row, colIndex);
        continue;
      }
      //if on last line and no conflicts return true
      if (row === n - 1) {
        return true;
      }
      //otherwise do a recursive call
      if (searchBoard(row + 1)) {
        return true;
      }
      myBoard.togglePiece(row, colIndex);
    }
    //otherwise return false
    return false;
  }

  //call the search rows function with row 0 and col 0
  searchBoard(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(myBoard.rows()));

  return myBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var solutionCount = 0;
  var myBoard = new Board({n: n});

  var findSolution = function(row) {

    // if all rows exhausted
    if (row === n) {
      // increment solutionCount
      solutionCount++;
        //stop
        return;
    }

    //iterate over possible solutions
    for (var i = 0; i < n; i++) {
      //place a piece
      myBoard.togglePiece(row, i);
      if (!myBoard.hasAnyQueensConflicts()) {
        //recurse into remaining problem
        findSolution(row + 1);
      }      //unplace a piece
      myBoard.togglePiece(row, i);
    }

  }

  findSolution(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
