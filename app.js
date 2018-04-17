
const animals = [{
    id: 1,
    image: 'assets/svg/001-lamb.svg',
    translation: 'cordeiro'
  },
  {
    id: 2,
    image: 'assets/svg/002-fish.svg',
    translation: 'peixe'
  },
  {
    id: 3,
    image: 'assets/svg/003-mouse.svg',
    translation: 'rato'
  },
  {
    id: 4,
    image: 'assets/svg/004-bird.svg',
    translation: 'pássaro'
  },
  {
    id: 5,
    image: 'assets/svg/005-pig.svg',
    translation: 'porco'
  },
  {
    id: 6,
    image: 'assets/svg/006-cow.svg',
    translation: 'vaca'
  },
  {
    id: 7,
    image: 'assets/svg/007-horse.svg',
    translation: 'cavalo'
  },
  {
    id: 8,
    image: 'assets/svg/008-cat.svg',
    translation: 'gato'
  },
  {
    id: 9,
    image: 'assets/svg/009-dog.svg',
    translation: 'cão'
  },
  {
    id: 10,
    image: 'assets/svg/010-chicken.svg',
    translation: 'frango'
  }
];
const gameboard = document.getElementById('gameboard');
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
// timer
let gameTimer = document.querySelector(".timer");
console.log(gameTimer);
//
// let seconds = 0;
// let minutes = 0;

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
// As vocabulary list is an array of objects, this function creates a shuffled array of both images and translations.
function createShuffledArray() {
  let properties = [];
  for (var i = 0; i < animals.length; i++) {
    var images = animals[i].image;
    properties.push(images);
    var translations = animals[i].translation;
    properties.push(translations);
  }
  const shuffledArray = shuffle(properties);
  console.table(shuffledArray);
  return shuffledArray;
}


function createCardFront() {
  const shuffledArray = createShuffledArray();

  shuffledArray.forEach(function(property) {
    const cardContainer = document.createElement('li');
    const cardWrapper = document.createElement('div');
    const contentContainer = document.createElement('div');
    const img = document.createElement('img');
    const translation = document.createElement('p');


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
      contentContainer.appendChild(translation);
      translation.textContent = property;
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
  createCardFront();
  createCardBack();
}

createBoard();


function addEventListenerToDeck() {
  gameboard.addEventListener('click', rotateCard);
}

addEventListenerToDeck();




function rotateCard(evt) {
  // debugger;
  if ((evt.target.nodeName === 'DIV') && (evt.target.className === 'js-back')){ // ← verifies target is div.js-back

    let clickedCard = event.target;
    let parentEl = clickedCard.parentElement;
    let flipperContainer = parentEl.parentElement;
    let siblingEl = clickedCard.previousElementSibling;


    parentEl.classList.add('js-flipped');
    firstCardflipped = true;
    startTimer();
    flippedCardsCounter ++;
    // First - gathering values of clicked cards

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
      movesCounter++;
      console.log(movesCounter);
      // getCardId();
      gameboard.removeEventListener('click', rotateCard);

          // checkedCardsId2();
          if ((checkIfCardsMatch(getCardId()) === true)) {

            for(var i = 0; i < flippedCards.length; ++i) {
              // flippedCards[i].children[0].classList.remove('js-flipped');
              flippedCards[i].children[0].classList.add('js-match');
            }
            matchedCards.push(checkedCardsId);

          }



          setTimeout(function(){
            for(var i = 0; i < flippedCards.length; ++i) {
              flippedCards[i].children[0].classList.remove('js-flipped');
              flippedCards[i].classList.remove('js-flipped');
            }
          }, 2000);

          setTimeout(resetArrays, 2100);
      }
      addEventListenerToDeck();
    }
    console.log(movesCounter);
    isGameOver();
}



function resetArrays(){
  flippedCards = [];
  checkedCardsId = [];
  cardValues = [];
}

function getCardId(){
  console.log(cardValues);
  for (var obj of animals)
    if (checkedCardsId.length < 2) {
      if (cardValues.includes(obj.image)) {
        checkedCardsId.push(obj.id);
      }

      if (cardValues.includes(obj.translation)) {
        checkedCardsId.push(obj.id);
      }
    }
  return checkedCardsId;
}

function isGameOver() {
  if (matchedCards.length === 10) {

    isGameOverFlag = true;
      console.log("Game over");
  }
}




function checkIfCardsMatch(checkCardId) {
  console.log(checkedCardsId);
  if ((checkedCardsId.length === 2) && (checkedCardsId[0] === checkedCardsId[1])) {
    // matchedCards.push(cardValues);
    return true;
  } else {
    return false;
  }
}


// TIMER

let second = 0;
let minute = 0;
let interval;
function startTimer(){
    interval = setInterval(function(){
        // gameTimer.innerHTML = minute+" mins "+second+" secs";
        gameTimer.innerHTML = `${minute} mins: ${second} secs`;
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        // if(minute == 60){
        //     hour++;
        //     minute = 0;
        // }
    }, 1000);
}

/*TO D0
// 1. Logika - isGameOver
// TIMER
// Gwiazdki od ilosci ruchow





1. styl do ratingu
2. helper - lista slowek */
// /*
//  * set up the event listener for a card. If a card is clicked:
//  *  - display the card's symbol (put this functionality in another function that you call from this one)
//  *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
//  *  - if the list already has another card, check to see if the two cards match
//  *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
//  *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
//  *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
//  *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
//  */
