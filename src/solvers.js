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

window.findNRooksSolution = function(n,array) {
  // console.log(array);
  if(!array){
    var emptyBoard =  new Board({'n':n});
    var Matrix = emptyBoard.rows();
  } else{
    var Matrix = array;
    var emptyBoard = new Board(Matrix);
  }
  //iterate over rows
  for(var row = 0;row<emptyBoard.rows().length;row++){
    var thisRow = emptyBoard.get(row);
    //iterate over cells in row
    for(var cell = 0;cell<thisRow.length;cell++){

      if(!Matrix[row][cell]){
        Matrix[row][cell] = 1;
        var emptyBoard = new Board(Matrix);
        if(emptyBoard.hasAnyRowConflicts() || emptyBoard.hasAnyColConflicts()){
          Matrix[row][cell] = 0;
          var emptyBoard = new Board(Matrix);
        }
      }
    }
  }
  var solution = emptyBoard.rows();
  if(!array){
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    return solution;
  } else {
    return solution;
  }

};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var storage = [];
  var emptyMatrix = new Board({'n':n});
  var emptyMatrix = emptyMatrix.rows();
  //iterate over rows of emptyMAtrix
  for(var rows=0;rows<emptyMatrix.length;rows++){
    var thisRow = emptyMatrix[rows];
    //now we are ready to iterate over every cell of the matrix
    for(var cell = 0;cell<thisRow.length;cell++){
      //create a Matrix instance for unique cell starting point
      var newBoard = new Board({'n':n});
      var newMatrix = newBoard.rows();
      //console.log("before"+" "+newMatrix)
      newMatrix[rows][cell] = 1;
      // console.log(rows+" "+cell);
      //store a solution for the unique Matrix
      //debugger;
      //console.log("after"+" "+newMatrix);
      var answer = this.findNRooksSolution(n,newMatrix);

      storage.push(JSON.stringify(answer));
      var inverted = [];
      for(var g=0;g<answer.length;g++){
        inverted.push(answer[g].slice().reverse());
      }
      storage.push(JSON.stringify(inverted));
      var superInverted = inverted.slice().reverse();
      storage.push(JSON.stringify(superInverted))

      var verticalInvert = answer.slice().reverse();
      storage.push(JSON.stringify(verticalInvert));

    }
  }
  //check storage for duplicates

  var apples =  _.uniq(storage);
  console.log(storage)


  var solutionCount = apples.length; //fixme

  for(var i=0;i<apples.length;i++){
    console.log(apples[i]+"")
  }
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

//****consider flattenign the array for optimization
// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
