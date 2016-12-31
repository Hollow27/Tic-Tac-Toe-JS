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
