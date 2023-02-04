'use strict';

// Selecting Elements

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const rollBtn = document.querySelector('.btn--roll');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// Starting Conditions :

let score, currentScore, score1, activePlayer, playing;

const startCondiions = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  score = [0, 0];
  currentScore = 0;
  score1 = 0;
  activePlayer = 0;
  playing = true;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
};

const swtichPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

startCondiions();
// Rolling Dice Functionality

rollBtn.addEventListener('click', function () {
  if (playing) {
    // 1.set random number :
    const dice = Math.trunc(Math.random() * 6 + 1);
    // 2.Display Dice :

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3.Add dice num to current Score + checking Rolled dice Number :
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch Player
      swtichPlayer();
    }
  }
});

// Holding Score :

holdBtn.addEventListener('click', function () {
  if (playing) {
    // 1.add current score to the total score

    score[activePlayer] += currentScore;

    // 2. Display Scores

    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    // 3.Check if player score is >= 100;

    if (score[activePlayer] >= 100) {
      // Finish the game

      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      // 4. if it's not finish Switch Player

      swtichPlayer();
    }
  }
});

// Starting New Game :

newBtn.addEventListener('click', startCondiions);
