/*
 * Create a list that holds all of your cards
 */
const gameboard= document.getElementById('gameboard');

const animals = [
  { id: 1,
    image: 'assets/svg/001-lamb.svg',
    translation: 'cordeiro'
  },
  { id: 2,
    image: 'assets/svg/002-fish.svg',
    translation: 'peixe'
  },
  { id: 3,
    image: 'assets/svg/003-mouse.svg',
    translation: 'rato'
  },
  { id: 4,
    image: 'assets/svg/004-bird.svg',
    translation: 'pássaro'
  },
  { id: 5,
    image: 'assets/svg/005-pig.svg',
    translation: 'porco'
  },
  { id: 6,
    image: 'assets/svg/006-cow.svg',
    translation: 'vaca'
  },
  { id: 7,
    image: 'assets/svg/007-horse.svg',
    translation: 'cavalo'
  },
  { id: 8,
    image: 'assets/svg/008-cat.svg',
    translation: 'gato'
  },
  { id: 9,
    image: 'assets/svg/009-dog.svg',
    translation: 'cão'
  },
  { id: 10,
    image: 'assets/svg/010-chicken.svg',
    translation: 'frango'
  }
];

// If the counter === 2, it is not possible to rotate more cards as eventListener function is temporarily removed;

let flippedCardsCounter = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
  return shuffledArray;
}


function createCardFront(){
  const shuffledArray =  createShuffledArray();

  shuffledArray.forEach(function(property) {
    const cardContainer = document.createElement('li');
    const cardWrapper = document.createElement('div');
    const contentContainer = document.createElement('div');
    const img = document.createElement('img');
    const translation = document.createElement('p');

    gameboard.appendChild(cardContainer);

    cardContainer.appendChild(cardWrapper);
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
// createCardFront();

function createCardBack(){
  const cardFronts = document.getElementsByClassName('js-front');
  for(var i = 0; i < cardFronts.length; i++) {
    const cardBack = document.createElement('div');
    cardFronts[i].insertAdjacentElement('afterend', cardBack);
    cardBack.classList.add('js-back');
  }
}

// createCardBack();

function createBoard(){
  createCardFront();
  createCardBack();

}

createBoard();


function addEventListenerToDeck (){
  gameboard.addEventListener('click', rotateCard);
}

document.querySelector('#gameboard').addEventListener('click', function (evt) {
    if (evt.target.nodeName === 'DIV') {  // ← verifies target is desired element
        const clickedCard = event.target;
        console.log(clickedCard);
        const parentEl = clickedCard.parentElement;
        const flipperContainer = parentEl.parentElement;
        console.log(parentEl, 'parent');
        parentEl.classList.add('js-flipper');
        flipperContainer.classList.add('js-flip-container');
          console.log(evt.target.classList);

        let clickedCards = [];
        clickedCards.push(clickedCard);
        console.log(clickedCards);
        getCardAttributes();
    }

      parentEl.classList.add('js-flipper');
      flipperContainer.classList.add('js-flip-container');

      flippedCardsCounter ++;

      // If two cards are rotated, eventListener is removed.
      if (flippedCardsCounter === 2) {
        gameboard.removeEventListener('click', rotateCard);
      }
  }
}

// Pobieranie wartości z klikniętych kart
function getCardAttributes(){
  const clickedCard = event.target;
  const cardGetValue = clickedCard.children[0];
  console.log(cardGetValue);
  // const cardValue = cardGetValue[0].innerHTML;
  // const src = cardGetValue[0].src;
  //

}
// function handleCardClick(event) {
//     const clickedCard = event.target;
//     const parentCard = clickedFigure.parentElement;
//     parentCard.classList.add('flipped');
//     const figureId = parentCard.getAttribute('id');
//
//     // stores flipped cards id's, max. 2
//     flippedCards.push(figureId);
//     firstCardIsFlipped = true;
//
//     // temporarily removes event listener from the first clicked card to prevent                                                                     dubleclick and incorrect match
//     clickedFigure.removeEventListener('click', handleCardClick);
//     setTimeout(function () {
//         clickedFigure.addEventListener('click', handleCardClick);
//     }, 600);

/*TO D0
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
