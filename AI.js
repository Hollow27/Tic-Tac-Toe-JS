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

  function minimaxValue(state) { ... }

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
