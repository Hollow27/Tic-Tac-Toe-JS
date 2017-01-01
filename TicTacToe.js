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
