import css from '../styles/dobbel.css'

const dice = document.getElementById("dice")
const min = 1
const max = 6
const minTime = 2000;
const maxTime = 3000;

let rolledClass = false
let lastRoll = 1
let reRollTimeout = false
let rollTimeout = false

const getRolledNumber = () => {
  // console.info('roll again')
  const rl = Math.floor(Math.random() * max) + min;
  // console.info(`rolled: ${rl}`)
  return rl
}

const rollDice = () => {
  // console.info('keep on rolin\'');
  if (reRollTimeout) {
    clearTimeout(reRollTimeout)
  }
  if (rollTimeout) {
    clearTimeout(rollTimeout)
  }
  
  dice.classList.add('spin')
  if (rolledClass) {
    dice.classList.remove(rolledClass)
    actionsList.classList.remove(rolledClass);
  }
  let rolled = getRolledNumber();
  if (rolled === 1 || rolled === 6) {
    reRollTimeout = setTimeout(() => {
      rolled = getRolledNumber()
    }, 50)
  }
  // calculate chance to re-roll if samee as previous roll
  if (rolled === lastRoll) {
    rolled = (Math.floor(Math.random() * 0) + 1) ? getRolledNumber() : rolled
  }
  const rollTime = Math.floor(Math.random() * (maxTime - minTime + 1) + minTime);
  
  rollTimeout = setTimeout(() => {
    switch (rolled) {
      case 1:
        rolledClass = "one";
        break;
      case 2:
        rolledClass = "two";
        break;
      case 3:
        rolledClass = "three";
        break;
      case 4:
        rolledClass = "four";
        break;
      case 5:
        rolledClass = "five";
        break;
      case 6:
        rolledClass = "six";
        break;
      default:
        rolledClass = "rolin";
    }
    dice.classList.add(rolledClass)
    actionsList.classList.add(rolledClass)
    dice.classList.remove('spin')
  }, rollTime)

}


// Actions
import Rounds from './rounds'

const btnRoundOne = document.getElementById('roundOne')
const btnRoundTwo = document.getElementById('roundTwo')
const actionsList = document.getElementById('actions')
const btnStart = document.getElementById('start')
const btnEnd = document.getElementById('end')
const toggleSettings = document.getElementById('toggleSettings')

const loadRound = (round) => {
  const list = document.createElement('ul')
  actionsList.innerHTML = ''
  for (var side in Rounds[round]) {
    document.getElementById(side).value = Rounds[round][side]
    const action = document.createElement('li')
    action.innerHTML = Rounds[round][side]
    list.appendChild(action)
  }
  actionsList.appendChild(list)
}

const updateList = () => {
  actionsList.innerHTML = ''
  const inputElements = document.querySelectorAll('form input')
  const list = document.createElement('ul')
  inputElements.forEach(el => {

    const action = document.createElement('li')
    action.innerHTML = el.value
    list.appendChild(action)
  
    el.getAttribute('id')
  })
  actionsList.appendChild(list)
}

btnRoundOne.addEventListener('click', () => {
  loadRound('one')
})
btnRoundTwo.addEventListener('click', () => {
  loadRound('two')
})

btnStart.addEventListener('click', () => {
  if (rolledClass){
    actionsList.classList.remove(rolledClass);
  }
  dice.addEventListener('click', rollDice)
  updateList()
  document.getElementsByTagName('aside')[0].classList.toggle('open')
})

btnEnd.addEventListener("click", () => {
  dice.removeEventListener("click", rollDice)
  actionsList.innerHTML = ''
  if (rolledClass) {
    actionsList.classList.remove(rolledClass)
  }
});

toggleSettings.addEventListener('click', () => {
  document.getElementsByTagName('aside')[0].classList.toggle('open')
})