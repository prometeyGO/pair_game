document.addEventListener('DOMContentLoaded', () => {
  let numbers = [];

  // передаём количество карточек из формы в программу
  function startGame() {
    const startWrap = document.querySelector('.game__start');
    const form = document.querySelector('.start__input');
    const startBtn = document.querySelector('.start__btn');
    let amountCards;

    startBtn.addEventListener('click', () => {
      if (Number(form.value) < 4) {
        amountCards = 4;
        startWrap.style.display = 'none';
      } else if (Number(form.value) > 20) {
        amountCards = 20;
        startWrap.style.display = 'none';
      } else {
        amountCards = Number(form.value);
        startWrap.style.display = 'none';
      }

      createArray(amountCards);
      shuffle(numbers);
      addCards()
    });
  }
  startGame()


  // создаём массив с игровыми номерами
  function createArray(amountCards) {
    for (let i = 1; i <= amountCards / 2; i++) {
      numbers.push(i);
      numbers.push(i);
    }
  }


  // перемещиваем элементы массива
  function shuffle(arr) {
    let currentIndex = arr.length;
    let randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
  }


  // создаём шаблон игровой карты
  let useCards = [];
  let counSuccess = 0;

  function newCard(number) {
    let card;
    let cardNumber;

    card = document.createElement('div');
    cardNumber = document.createElement('p');
    card.classList.add('game__card');
    cardNumber.classList.add('card__number');
    cardNumber.textContent = number;

    document.getElementById('game__wrap').append(card);
    card.append(cardNumber);

    // описываем логику игры
    card.addEventListener('click', () => {
      if (card.classList.contains('open') == false && card.classList.contains('success') == false) {
        card.classList.add('open');
        cardNumber.classList.add('open');

        useCards.push(card);

        if (useCards.length == 2) {
          for (i in useCards) {
            if (useCards[0].textContent == useCards[1].textContent) {
              setTimeout(function() {
                for (i in useCards) {
                  useCards[i].classList.add('success');
                  counSuccess += 1;

                  if (counSuccess == numbers.length) {
                    setTimeout(function() {
                     document.getElementById('game__wrap').style.display = 'none';
                     endGame()
                    }, 500)
                  }
                }
                useCards.length = 0;
              }, 500);
            } else {
              setTimeout(function() {
                for (i in useCards) {
                  useCards[i].classList.remove('open');
                }
                useCards.length = 0;
              }, 500);
            }
          }
        }
      }
    });
  }


  // создаём нужное колличество карт и записываем в них номера из перемешанного массива
  function addCards() {
    for (number of numbers) {
      newCard(number);
    }

    cardsInRow();
  }

  function cardsInRow() {
    const gameWrap = document.querySelector('.game__wrap');

    if (numbers.length === 4) {
      gameWrap.style.width = '400px';
    } else if (numbers.length === 6) {
      gameWrap.style.width = '700px';
    } else if (numbers.length === 8 || numbers.length === 12 || numbers.length === 16) {
      gameWrap.style.width = '800px';
    } else if (numbers.length === 10 || numbers.length === 14 || numbers.length === 20) {
      gameWrap.style.width = '900px';
    } else if (numbers.length === 18) {
      gameWrap.style.width = '1200px';
    }
  }


  // описываем конец игры
  function endGame() {
    const endWrap = document.querySelector('.game__end');
    const endBtn = document.querySelector('.end__btn');

    endWrap.style.display = 'flex';

    endBtn.addEventListener('click', () => {
      location. reload();
    });
  }
});




