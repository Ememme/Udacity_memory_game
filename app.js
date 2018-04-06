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

// Create a board

function createBoard(){
  const shuffledBoard = shuffle(animals);

  for (let i = 0; i < shuffledBoard.length; i++) {
        const cardContainer = document.createElement('li');
        const frontCard = document.createElement('div');
        const backCard = document.createElement('div');
        const img = document.createElement('img');

        gameboard.appendChild(cardContainer);
        // This will create 'closed' cards with Portugese flag added in css.
        cardContainer.appendChild(frontCard);
        frontCard.classList.add('js-front');
        // Adding cards with symbols and descriptions
        cardContainer.appendChild(backCard);
        backCard.classList.add('js-back');
        backCard.appendChild(img);

        img.setAttribute('src', shuffledBoard[i].image);
        // backCard.innerText(shuffledBoard[i].translation);
    }
    var fragment = document.createDocumentFragment();

    animals.forEach(function(animal) {
        var translations = document.createElement('li');
        var translationsFront = document.createElement('div');
        var translationsBack = document.createElement('div');
        var par = document.createElement('p');
        gameboard.appendChild(translations);
        translations.appendChild(translationsFront);
        translationsFront.classList.add('js-front');
        translations.appendChild(translationsBack);
        translationsBack.classList.add('js-back');
        translationsBack.appendChild(par);
        par.textContent = animal.translation;
        fragment.appendChild(translations);
    });

    gameboard.appendChild(fragment);
    const toShuffle = document.querySelectorAll('div.js-back');
    shuffle(toShuffle);
};



createBoard();
// const toShuffle = document.querySelectorAll('div.js-back');
// shuffle(toShuffle);

console.log(toShuffle);



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
