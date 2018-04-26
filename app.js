// Declaration of all variables
const animals = [{
    id: 1,
    image: 'assets/svg/001-lamb.svg',
    translationPT: 'cordeiro',
    translationEN: 'lamb'
  },
  {
    id: 2,
    image: 'assets/svg/002-fish.svg',
    translationPT: 'peixe',
    translationEN: 'fish'
  },
  {
    id: 3,
    image: 'assets/svg/003-mouse.svg',
    translationPT: 'rato',
    translationEN: 'mouse'

  },
  {
    id: 4,
    image: 'assets/svg/004-bird.svg',
    translationPT: 'pássaro',
    translationEN: 'bird'
  },
  {
    id: 5,
    image: 'assets/svg/005-pig.svg',
    translationPT: 'porco',
    translationEN: 'pig'
  },
  {
    id: 6,
    image: 'assets/svg/006-cow.svg',
    translationPT: 'vaca',
    translationEN: 'cow'
  },
  {
    id: 7,
    image: 'assets/svg/007-horse.svg',
    translationPT: 'cavalo',
    translationEN: 'horse'
  },
  {
    id: 8,
    image: 'assets/svg/008-cat.svg',
    translationPT: 'gato',
    translationEN: 'cat'
  },
  {
    id: 9,
    image: 'assets/svg/009-dog.svg',
    translationPT: 'cão',
    translationEN: 'dog'
  },
  {
    id: 10,
    image: 'assets/svg/010-chicken.svg',
    translationPT: 'frango',
    translationEN: 'chicken'
  }
];
const gameboard = document.getElementById('gameboard');
// Popup holding a list of words to be learned (ENG - PT)
const vocabPopup = document.getElementById('vocabulary-popup-window');
const vocabularyList = document.getElementsByClassName('translations');

let gameStarted = false;
// Stores 'li' elements of clicked card (parent element to facilitate flipping of a card)
let flippedCards = [];
// If the counter === 2, it is not possible to rotate more cards as eventListener function is temporarily removed;
let flippedCardsCounter = 0;
// used for initalizing timer
let firstCardflipped = false;
// // How many pairs of cards were flipped before completing game
let movesCounter = 0;
// Stores matching cards
let matchedCards = [];
// Stores textContent or img src of a clicked card
let cardValues = [];
// Stores id of a clicked card as provided in original animal array
let checkedCardsId = [];
// Flag for gameboard
let isGameOverFlag = false;
// Timer
let gameTimer = document.querySelector('.timer');
// Stars used for rating
const stars = document.querySelectorAll('.fa-star');
// Display player's moves count
let movesDisplay = document.querySelector('.moves');
// Collection of all reload buttons
const reloadButtons = document.getElementsByClassName('restart-button');


function startGame() {
  resetGameSettings();
  createBoard();
  addEventListenerToDeck();
  addEventListenersToRestartButtons();
  closeModal();

}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
/* Vocabulary list is an array of objects {id: integer, image: image, translationPT: string},
this function creates a shuffled array of both images and translationPTs.*/
function createShuffledArray() {
  let properties = [];
  for (var i = 0; i < animals.length; i++) {
    var images = animals[i].image;
    properties.push(images);
    var translationPTs = animals[i].translationPT;
    properties.push(translationPTs);
  }
  const shuffledArray = shuffle(properties);
  return shuffledArray;
}


function createCardFront() {
  const shuffledArray = createShuffledArray();

  shuffledArray.forEach(function(property) {
    const cardContainer = document.createElement('li');
    const cardWrapper = document.createElement('div');
    const contentContainer = document.createElement('div');
    const img = document.createElement('img');
    const translationPT = document.createElement('p');


    gameboard.appendChild(cardContainer);

    cardContainer.appendChild(cardWrapper);
    cardContainer.classList.add('js-flip-container');
    cardWrapper.classList.add('js-card-wrapper');
    cardWrapper.appendChild(contentContainer);
    contentContainer.classList.add('js-front');

    if (property.includes('svg')) {
      contentContainer.appendChild(img);
      img.setAttribute('src', property);
    } else {
      contentContainer.appendChild(translationPT);
      translationPT.textContent = property;
    }
  });
}

function createCardBack() {
  const cardFronts = document.getElementsByClassName('js-front');

  for (var i = 0; i < cardFronts.length; i++) {
    const cardBack = document.createElement('div');
    cardFronts[i].insertAdjacentElement('afterend', cardBack);
    cardBack.classList.add('js-back');
  }
}


function createBoard() {
  // clears gameboard before restart
  gameboard.innerHTML = '';
  createCardFront();
  createCardBack();
}

function addEventListenerToDeck() {
  gameboard.addEventListener('click', rotateCard);
}

function rotateCard(evt) {
  if ((evt.target.nodeName === 'DIV') && (evt.target.className === 'js-back')) { // ← verifies target is div.js-back

    let clickedCard = event.target;
    let parentEl = clickedCard.parentElement;
    let flipperContainer = parentEl.parentElement;
    let siblingEl = clickedCard.previousElementSibling;


    parentEl.classList.add('js-flipped');
    firstCardflipped = true;

    // Start timer when first card is clicked
    if (!gameStarted) {
      startTimer();
      gameStarted = true;
    }

    moveCounter();
    flippedCardsCounter++;

    //Getting values of clicked cards
    flippedCards.push(flipperContainer);

    if (siblingEl.textContent !== "") {
      cardValues.push(siblingEl.textContent);
    } else {
      // Extracting file name
      let string = siblingEl.innerHTML;
      let imgSrc = string.substring(10, string.length - 2);
      cardValues.push(imgSrc);
    }


    // If two cards are flipped:

    if (flippedCards.length === 2) {
      console.log(flippedCards);
      console.log(movesCounter);
      // removing eventListener to prevent flipping more than 2 cards
      gameboard.removeEventListener('click', rotateCard);
      movesCounter++;

      // If cards match:
      if (checkIfCardsMatch(getCardId())) {
        for (var i = 0; i < flippedCards.length; ++i) {
          flippedCards[i].children[0].classList.add('js-match');
          flippedCards[i].classList.remove('js-flipped');
        }
        matchedCards.push(checkedCardsId);
      } else {
        setTimeout(function() {
          for (var i = 0; i < flippedCards.length; ++i) {
            flippedCards[i].children[0].classList.remove('js-flipped');
            flippedCards[i].classList.remove('js-flipped');
          }
        }, 1800);
      }
      setTimeout(addEventListenerToDeck, 1850);
      setTimeout(resetArrays, 1850);



    }
  }
  console.log(movesCounter);
  isGameOver();
}


function resetArrays() {
  flippedCards = [];
  checkedCardsId = [];
  cardValues = [];
}

function getCardId() {
  for (var obj of animals)
    if (checkedCardsId.length < 2) {
      if (cardValues.includes(obj.image)) {
        checkedCardsId.push(obj.id);
      }

      if (cardValues.includes(obj.translationPT)) {
        checkedCardsId.push(obj.id);
      }
    }
  return checkedCardsId;
}
function checkIfCardsMatch(checkCardId) {
  if ((checkedCardsId.length === 2) && (checkedCardsId[0] === checkedCardsId[1])) {
    return true;
  } else {
    return false;
  }
}


// TIMER

let second = 0;
let minute = 0;
let hour = 0;
let interval;

function startTimer() {
  interval = setInterval(function() {
    gameTimer.innerHTML = `${minute} mins: ${second} secs`;
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if(minute == 60){
        hour++;
        minute = 0;
    }
  }, 1000);
}

function resetTimer() {
    clearInterval(interval);
    second = 0;
    minute = 0;
}


// Moves and their influence on stars

function moveCounter() {

  movesDisplay.innerHTML = `Your moves: ${movesCounter}`;

  if (movesCounter > 10 && movesCounter < 14) {
    for (i = 0; i < stars.length; i++) {
      if (i > 1) {
        stars[i].style.visibility = "hidden";
      }
    }
  } else if (movesCounter > 15) {
    for (i = 0; i < stars.length; i++) {
      if (i > 0) {
        stars[i].style.visibility = "hidden";
      }
    }
  }
}

function isGameOver() {
  if (matchedCards.length === 10) {
    isGameOverFlag = true;
    congratulations();
  }
}

function congratulations() {
  if (matchedCards.length == 10) {
    clearInterval(interval);
    totalTime = gameTimer.innerHTML;

    let starRating = document.querySelector(".rating").innerHTML;
    //showing move, rating, time on modal
    document.getElementById("total-moves").innerHTML = movesCounter;
    document.getElementById("star-rating-info").innerHTML = starRating;
    document.getElementById("total-time").innerHTML = totalTime;

    popup.style.display = 'block';

    closeModal();
  }
}

const popup = document.getElementById('popup-window');
// Closing modal
function closeModal() {
  const close = document.getElementsByClassName('close-modal')[0];
  close.addEventListener('click', hideCongratulationsModal, false);
}


function hideCongratulationsModal() {
    popup.style.display = 'none';
}


function addEventListenersToRestartButtons() {
  for(var i = 0; i < reloadButtons.length; i++) {
      reloadButtons[i].addEventListener('click', startGame);
    }
}


function reloadStars() {
  for (i = 0; i < stars.length; i++) {
      stars[i].style.visibility = "visible";
    }
}

function resetGameSettings() {
  hideCongratulationsModal();
  matchedCards = [];
  movesCounter = 0;
  movesDisplay.innerHTML = `Your moves: ${movesCounter}`;
  gameStarted = false;
  reloadStars();
  resetTimer();
  gameTimer.innerHTML = `${minute} mins: ${second} secs`;

}
// Vocabulary list:
function vocabularyPairs (){
  animals.forEach(function(animal) {
      let translationPair = document.createElement('li');
      translationPair.innerHTML = `${animal.translationEN}: ${animal.translationPT}`;
      vocabularyList[0].appendChild(translationPair);
  });
}

function addEventListenerToVocabList(){
  const vocabButton = document.getElementById('vocab-btn');
  vocabButton.addEventListener('click', hideVocabList);

}

addEventListenerToVocabList();

function hideVocabList() {
  const vocabPopup = document.getElementById('vocabulary-popup-window');
  vocabPopup.style.visibility = 'hidden';
}

function showVocabList(){

  vocabPopup.style.visibility = 'visible';
}


function addEventListenerToVocabBulb(){
  const vocabBulb = document.getElementsByClassName('vocab-bulb');
  vocabBulb[0].addEventListener('click', showVocabList);
}

addEventListenerToVocabBulb();

vocabularyPairs();

startGame();
