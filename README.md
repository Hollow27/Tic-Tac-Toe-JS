# Tic-Tac-Toe-JS

#Building a Tic Tac Toe Game (with AI composed of 3 levels) with Javascript

When we say the word game in the context of AI we usually don’t mean it in the sense of entertainment games, instead we refer to a more general definition of a game:

<h6>"A game is a multi-agent environment in which agents compete and/or cooperate on some specific task(s) while meeting some specific criteria. An agent is referred to as a player."</h6>

We can easily see that entertainment games also fall under the general definition of games. Take chess for example. In chess there are two players (multi-agent) who are competing on who captures the other’s king first (the task) in the lowest number of moves (the criteria).And because entertainment games have the same properties and characteristics of any other general game, we can use a simple entertainment game to demonstrate the AI concepts and techniques used in any form of a general game, and that’s what this post is all about.

I'll be working with Tic-Tac-Toe mainly because of its simplicity. It has simple rules, simple actions, and simple ending configurations, which makes it easy to describe it computationally.

The first thing I need to do is to describe and understand the game we want to build. We could describe it verbally as follows:

<h6>Two players (player X, and player O) play on 3x3 grid. Player X is a human player, and player O is an AI. A player can put his/her letter (either X or O) in an empty cell in the grid. If a player forms a row, a column or a diagonal with his/her letter, that player wins and the game ends. If the grid is full and there’s no row, column or diagonal of the same letter, the game ends at draw. A player should try to win in the lowest possible number of moves.</h6>

#Formal Definiton

In working on an AI problem, one of the most fundamental tasks is to convert a verbal description of the problem into a formal description that can be used by a computer. This task is called Formal Definition. In formal definition we take something like the verbal description of Tic-Tac-Toe we wrote above, and transform it into something we can code. This step is extremely important bacause the way you formally define your problem will determine whether easy or difficult it will be to implement the AI that solves the problem, and we certainly want that to be easy.

Usually, there are some ready definitions we can use and tweak in formally defining a problem. These definitions have been presented and accepted by computer scientists and engineers to represent some classes of problems. One of these definitions is the game definition: If we know our problem represents a game, then we can define it with the following elements:

<h6>A finite set of states of the game.</h6> In our game, each state would represent a certain configuration of the grid.
<h6>A finite set of players which are the agents playing the game.</h6> In Tic-Tac-Toe there’s only two players: the human player and the AI.
<h6>A finite set of actions that the players can do.</h6> Here, there’s only one action a player can do which is put his/her letter on an empty cell.
<h6>A transition function</h6> that takes the current state and the played action and returns the next state in the game.
<h6>A terminal test function</h6> that checks if a state is terminal (that is if the game ends at this state).
<h6>A score function</h6> that calculates the score of the player at a terminal state.

Using this formal definition, we can start reasoning about how we’re gonna code our description of the game into a working game:
