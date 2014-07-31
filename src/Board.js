// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        //console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        //console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        //console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
        );
    },
    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
        );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

    */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    hasRowConflictAt: function(rowIndex) {
      //changes context of row to allow for numbers or arrays
      if(Array.isArray(rowIndex)){
        var row = rowIndex;
      } else{
        var row = this.get(rowIndex);
      }
      // if(typeof rowIndex === 'number'){
        // console.log(typeof rowIndex)
        // var row = this.get(rowIndex);
      // }else {
      //   var row =  rowIndex;
      // }

      var checkSwitch = false;
      for(var i = 0; i < row.length; i++){
        if(row[i] === 1){
          if(checkSwitch === false){
           checkSwitch = true;
         } else{ return true; }
       }
     }

      return false; // fixme
    },


    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //debugger;
      var thisBoard = this.rows();
      for(var rowIndex = 0; rowIndex < thisBoard.length; rowIndex++){
        var check =  this.hasRowConflictAt(rowIndex);

        if(check){
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //create column variable
      var column = [];
      //console.log(this.rows().length)
      //iterate over every row and push value at row[colIndex] into column to create the column
      for(var i=0;i<this.rows().length;i++){
        var row = this.rows()[i];
        column.push(row[colIndex]);
      }
      //iterate over the column to detect conflicts
      return this.hasRowConflictAt(column);

    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //iterate over one row, and pass each index into hasColConflictAt
      var numberOfColumns =this.get(0).length;
      for(var column=0;column<numberOfColumns;column++){
        if(this.hasColConflictAt(column)){
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
       //Maybe refactor this to use a coordinate system to eliminate wasted processess.

        //this.rows().length;
        //this.rows()[2][3]
        //
        //length of diagonal =  this.rows().length - topOfDiagonal


      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {

      var diagonal = [];
      var numberOfRows = this.rows().length;
      var Matrix = this.rows();

      for(var i=0;i<numberOfRows;i++){//for ever row
        var numberOfCells = Matrix[i].length;
        for(var k=0;k<numberOfCells;k++){ //for every cell
          diagonal = [];
          diagonal.push(Matrix[i][k]);
          for(var g=i+1;g<numberOfRows-1;g++){//for every row beneath
            diagonal.push(Matrix[g][k+1]); //increment the cell index
          }
          if(this.hasRowConflictAt(diagonal)){
            return true;
          }
        }
      }
      //
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var diagonal = [];
      var Matrix = this.rows();
      var dimension = this.get(0).length;
      //for every row in the matrix, starting at row Matrix.length-1
      for(var i=Matrix.length-1;i>0;i--){
        var row = Matrix[i];
        //iterate over every cell starting from the right
        for(var c = row.length-2;c>=0;c--){
          diagonal = [];
          diagonal.push(row[c]);
          var nextCell = c;
          //iterate over every row above c
          for(var r = i-1;r>=0;r--){
            nextCell++;
            if(nextCell<=(row.length-1)){
              diagonal.push(Matrix[r][nextCell]);
            }
          }
          if(this.hasRowConflictAt(diagonal)){
            return true;
          }
        }

      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};

}());
