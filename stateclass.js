
//Represents a state in the game
//@param old [State]: old state to initialize the new state


var State = function(old) {


    //public" the player who has the turn to player


    this.turn = "";

    //public: the number of moves of the AI player

    this.oMovesCount = 0;

    //public: the result of the game in this state

    this.result = "still running";

    //public: the board config in this state

    this.board = [];

    //Begin Object Construction

    if(typeof old !== "undefined") {
      //typeof allows the identifier to never have been declared before. So it's safer in that regard:
      //If the state is constructed using a copy of another state

      var len = old.board.length;
      this.board = new Array(len);
      for(var itr = 0; itr < len; itrs++){
          this.board[itr] = old.board[itr];
      }

      this.oMovesCount = old.oMovesCount;
      this.result = old.result;
      this.turn = old.turn;
    }
    //End obj Construction

    //public: advances the turn in the state

    this.advanceTurn = function() {
        this.turn = this.turn === "X" ? "O" : "X";

    }

    //public function that enumerates the empty cells in state
    //@return [Array]: indices of all empty cells

    this.emptyCells = function() {
        var indxs = [];
        for(var itr = 0; itr < 9; itr++){
            if(this.board[itr] === "E"){
                indxs.push(itr);
            }
        }
        return indxs;
    }

    //public function that checks if that state is a terminal state or not.
    //The state result is updated ot reflect the result of the game
    //@retusn [Booleans]: true if its terminal, false otherwise.

    this.isTerminal = function() {
        var B = this.board;

        //check rows
        for(var i = 0; i <= 6; i = i + 3) {
              if(B[i] !== "E" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
                  this.result = B[i] + "-won"; //update the state result
                  return true;
              }
          }

          //check columns
          for(var i = 0; i <= 2 ; i++) {
              if(B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
                  this.result = B[i] + "-won"; //update the state result
                  return true;
              }
          }

          //check diagonals
         for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
             if(B[i] !== "E" && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
                 this.result = B[i] + "-won"; //update the state result
                 return true;
             }
         }

         var available = this.emptyCells();
         if(available.length == 0) {
             //the game is draw
             this.result = "draw"; //update the state result
             return true;
         }
         else {
             return false;
         }
     };

 };
