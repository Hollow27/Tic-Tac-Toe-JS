//contructs an AI player with a specific level of intelligence
//@parameter level [String]: the desired level of intelligence

var AI = function(level) {

  // privateattr: lvl of intelligence the player hasClass
  var levelofintelligence = level;

  //private attr: the game the player is playing
  var game = {};

  //Now we begin using the minimax function.
  //Its a private recursive function that computes the minimax value of a game state
  // @parameter stte [State]: the state to calculate its minimax value
  //@returns [number]: the minimax value of the state

  function minimaxValue(state) {
      if(state.isTerminal()) {
        //a terminal game state is the base case
        return Game.score(state);

      }
      else {
          var stateScore; //this stores the minimax value we'll compute

          if(state.turn === "X")
          // X minimizes -> initialize to a value smaller than any posibilities
              stateScore = -1000;
          else {
            // O minimizes -> initialize to a value larger than any possibility
              stateScore = 1000;


                      var availablePositions = state.emptyCells();

                      //enumerate next available states using the info form available positions
                      var availableNextStates = availablePositions.map(function(pos) {
                          var action = new AIAction(pos);

                          var nextState = action.applyTo(state);

                          return nextState;
                      });

                      // calculate the minimax value for all available next state and evaluate the current state's value
                      availableNextStates.forEach(function(nextState) {

                          var nextScore = minimaxValue(nextState); //recursive call

                          if(state.turn === "X") {
                              // X wants to maximize --> update stateScore iff nextScore is larger
                              if(nextScore > stateScore)
                                  stateScore = nextScore;
                              }
                          else {
                              // O wants to minimize --> update stateScore iff nextScore is smaller
                              if(nextScore < stateScore)
                                  stateScore = nextScore;
                          }
                      });

                      //backup the minimax value
                      return stateScore;
                  }
              }





      }




  }



  // private function: make the AI player take a blind move
  //that is: choose the cell to place its symbol randomly
  //@param turn [String]: the player to play either X or O.

  function takeABlindMove(turn) { ... }

  // prv fn: make the ai player take a novice moves
  // that is: mix between choosing the optimal and suboptimal minimax decisions (between blind and master)
  //@param turn [String]: the player to play either X or O

  function takeANoviceMove(turn) { ... }

  //prv fn: make AI make master moves
  //that is: choose the optimal or best minimax decision
  //@param turn [String]: the player to play X or O

  function takeAMasterMove(turn) { ... }

  //public method notify the when the AI will make a play
  //@param_game [game]: the game the AI will play

  this.plays = function(_game) {
      game = _game;

  };

  // public fn: notify Ai player to playe
  //@param turn [string]: the player to play X or O

  this.notify = function (turn) {
    switch(levelofintelligence) {
      //invoke desired behaviour based on the AI level chosen
      case "blind": takeABlindMove(turn); break;
      case "novice": takeANoviceMove(turn); break;
      case "master": takeAMasterMove(turn); break;

    }
  }
};

    //constructs an action that the AI player could make
    //@param position [number]: the cell position that the ai would make its action in

    var AIAction = function(pos) {

      // public: the pos on the board that the action would put the letter on
      thismovePosition = pos;

      //public: the minimax value of the stae that the action leads to when applied
      this.minimaxVal = 0;

      //public: applies the action to a state to get to the next state
      //@param state [state]: the state to apply the action to
      //@return [state]: the next state

      this.applyTO = function (state) {
          var next = new State(state);

          //put the letter on the baord
          next.board[this.movePosition] = state.turn;

          if(state.turn === "0")
              next.oMovesCount++;

          next.advanceTurn();

          return next;

      }

    };


    /*
 * public static method that defines a rule for sorting AIAction in ascending manner
 * @param firstAction [AIAction] : the first action in a pairwise sort
 * @param secondAction [AIAction]: the second action in a pairwise sort
 * @return [Number]: -1, 1, or 0
 */
AIAction.ASCENDING = function(firstAction, secondAction) {
    if(firstAction.minimaxVal < secondAction.minimaxVal)
        return -1; //indicates that firstAction goes before secondAction
    else if(firstAction.minimaxVal > secondAction.minimaxVal)
        return 1; //indicates that secondAction goes before firstAction
    else
        return 0; //indicates a tie
}

/*
 * public static method that defines a rule for sorting AIAction in descending manner
 * @param firstAction [AIAction] : the first action in a pairwise sort
 * @param secondAction [AIAction]: the second action in a pairwise sort
 * @return [Number]: -1, 1, or 0
 */
AIAction.DESCENDING = function(firstAction, secondAction) {
    if(firstAction.minimaxVal > secondAction.minimaxVal)
        return -1; //indicates that firstAction goes before secondAction
    else if(firstAction.minimaxVal < secondAction.minimaxVal)
        return 1; //indicates that secondAction goes before firstAction
    else
        return 0; //indicates a tie
}
