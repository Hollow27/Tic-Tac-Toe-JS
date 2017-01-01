//Constructs a game object to be played
//@param autoPlayer [AIPlayer] : the AI player to be play the game with

var Game = function(autoPlayer) {

    //public : initialize the ai player for this game
    this.ai = autoPlayer;

    // public : initialize the game current state to empty board configuration
    this.currentState = new State();

    //"E" stands for empty board cell
    this.currentState.board = ["E", "E", "E",
                               "E", "E", "E",
                               "E", "E", "E"];

    this.currentState.turn = "X"; //X plays first


    //initialize game status to beginning

    this.status = "beginning";


    //public function that advances the game to a new state
    //@param _state [State]: the new state to advance the game to

    this.advanceTo = function(_state) {
        this.currentState = _state;
        if(_state.isTerminal()) {
            this.status = "ended";

            if(_state.result === "X-won")
                //X won
                ui.switchViewTo("won");
            else if(_state.result === "O-won")
                //X lost
                ui.switchViewTo("lost");
            else
                //it's a draw
                ui.switchViewTo("draw");
        }
        else {
            //the game is still running

            if(this.currentState.turn === "X") {
                ui.switchViewTo("human");
            }
            else {
                ui.switchViewTo("robot");

                //notify the AI player its turn has come up
                this.ai.notify("O");
            }
        }
    };

    //starts the game
    this.start = function() {
        if(this.status = "beginning") {
            //invoke advanceTo with the intial state
            this.advanceTo(this.currentState);
            this.status = "running";
        }
    }

};


//public static function that calculates the score of the x player in a terminal state
//@param _state [State]: the state in which the score is calculated
//@return [Number]: the score calculated for the human player

Game.score = function(_state) {
    if(_state.result !== "still running") {
        if(_state.result === "X-won"){
            // the x player won
            return 10 - _state.oMovesCount;
        }
        else if(_state.result === "O-won") {
            //the x player lost
            return -10 + _state.oMovesCount;
        }
        else {
            //it's a draw
            return 0;
        }
    }
}


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


 // object to contain all items accessable to all control functions

 var globals = {};


 //choosing difficulty level (onclick span.level) behavior and control
 //when a level is clicked, it becomes highlighted and the "ai.level" variable is set to the chosen level

 $(".level").each(function() {
     var $this = $(this);
     $this.click(function() {
         $('.selected').toggleClass('not-selected');
         $('.selected').toggleClass('selected');
         $this.toggleClass('not-selected');
         $this.toggleClass('selected');

         ai.level = $this.attr("id");
     });
 });

 /*
  * start game (onclick div.start) behavior and control
  * when start is clicked and a level is chosen, the game status changes to "running"
  * and UI view to swicthed to indicate that it's human's trun to play
  */
 $(".start").click(function() {
     var selectedDiffeculty = $('.selected').attr("id");
     if(typeof selectedDiffeculty !== "undefined") {
         var aiPlayer = new AI(selectedDiffeculty);
         globals.game = new Game(aiPlayer);

         aiPlayer.plays(globals.game);

         globals.game.start();
     }
 });

 /*
  * click on cell (onclick div.cell) behavior and control
  * if an empty cell is clicked when the game is running and its the human player's turn
  * get the indices of the clicked cell, create the next game state, update the UI, and
  * advance the game to the new created state
  */
  $(".cell").each(function() {
      var $this = $(this);
      $this.click(function() {
          if(globals.game.status === "running" && globals.game.currentState.turn === "X" && !$this.hasClass('occupied')) {
              var indx = parseInt($this.data("indx"));

              var next = new State(globals.game.currentState);
              next.board[indx] = "X";

              ui.insertAt(indx, "X");

              next.advanceTurn();

              globals.game.advanceTo(next);

          }
      })
  });



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

    function takeABlindMove(turn) {
      var available = game.currentState.emptyCells();
      var randomCell = available[Math.floor(Math.random() * available.length)];
      var action = new AIAction(randomCell);

      var next = action.applyTo(game.currentState);

      ui.insertAt(randomCell, turn);

      game.advanceTo(next);
  }

    // prv fn: make the ai player take a novice moves
    // that is: mix between choosing the optimal and suboptimal minimax decisions (between blind and master)
    //@param turn [String]: the player to play either X or O

  /*
  A quick example to explain the though process behind the novice Ai design.
  Since we've decided that an AI would choose the optimal choice 40% of the time and an the first suboptimal choice 60% of the time,
  we need to do a little probability here.

  var P = 40; //some probability in percent form
  if(Math.random()*100 <= P) {
      // carry out the probable task with probability P
  }
  else {
     // carry out the other probable task with probability 1 - P
  }

  */

    function takeANoviceMove(turn) { ... }
    var available = game.currentState.emptyCells();

      //enumerate and calculate the score for each available actions to the ai player
      var availableActions = available.map(function(pos) {
          var action =  new AIAction(pos); //create the action object

          //get next state by applying the action
          var nextState = action.applyTo(game.currentState);

          //calculate and set the action's minimax value
          action.minimaxVal = minimaxValue(nextState);

          return action;
      });

      //sort the enumerated actions list by score
      if(turn === "X")
          //X maximizes --> decend sort the actions to have the maximum minimax at first
          availableActions.sort(AIAction.DESCENDING);
      else
          //O minimizes --> ascend sort the actions to have the minimum minimax at first
          availableActions.sort(AIAction.ASCENDING);



       //take the optimal action 40% of the time
       //take the 1st suboptimal action 60% of the time

      var chosenAction;
      if(Math.random()*100 <= 40) {
          chosenAction = availableActions[0];
      }
      else {
          if(availableActions.length >= 2) {
              //if there is two or more available actions, choose the 1st suboptimal
              chosenAction = availableActions[1];
          }
          else {
              //choose the only available actions
              chosenAction = availableActions[0];
          }
      }
      var next = chosenAction.applyTo(game.currentState);

      ui.insertAt(chosenAction.movePosition, turn);

      game.advanceTo(next);
  };
    //prv fn: make AI make master moves
    //that is: choose the optimal or best minimax decision
    //@param turn [String]: the player to play X or O

    function takeAMasterMove(turn) {
      var available = game.currentState.emptyCells();

   //enumerate and calculate the score for each avaialable actions to the ai player
   var availableActions = available.map(function(pos) {
       var action =  new AIAction(pos); //create the action object

       //get next state by applying the action
       var next = action.applyTo(game.currentState);

       //calculate and set the action's minmax value
       action.minimaxVal = minimaxValue(next);

       return action;
   });

   //sort the enumerated actions list by score
   if(turn === "X")
       //X maximizes --> descend sort the actions to have the largest minimax at first
       availableActions.sort(AIAction.DESCENDING);
   else
       //O minimizes --> acend sort the actions to have the smallest minimax at first
       availableActions.sort(AIAction.ASCENDING);


   //take the first action as it's the optimal
   var chosenAction = availableActions[0];
   var next = chosenAction.applyTo(game.currentState);

   // this just adds an X or an O at the chosen position on the board in the UI
   ui.insertAt(chosenAction.movePosition, turn);

   // take the game to the next state
   game.advanceTo(next);
  }

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
