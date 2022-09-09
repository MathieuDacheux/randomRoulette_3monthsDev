// VARIABLES

// Tableau de la liste des noms de la classe
const listOfName = [
    'Claude',
    'Damien',
    'Tristan',
    'Laura',
    'Paul',
    'Alexis G',
    'Alexis F',
    'Nassim',
    'Muriel',
    'Anthonin',
    'Christopher',
    'Mathieu',
    'Daniel',
    'Thierry'
];

let choice1;
let choice2;
let choice3;
let choice4;
let choice5;
let choice6;

const choiceTable = [
    choice1,
    choice2,
    choice3,
    choice4,
    choice5,
    choice6
];

const wheelParts = [
    caseOne = document.querySelector('.name1'),
    caseTwo = document.querySelector('.name2'),
    caseThree = document.querySelector('.name3'),
    caseFour = document.querySelector('.name4'),
    caseFive = document.querySelector('.name5'),
    caseSix = document.querySelector('.name6')
];

const button = document.querySelector('input');
const containerWheel = document.querySelector('.spinningWheel');
let rotateDeg;
let fullRotate = 0;

// FUNCTIONS

// Function that generate a random INT 
const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function thah generate random int for the choiceTable
const randomArray = () => {
    for (i = 0; i <= 5; i++) {
        choiceTable[i] = randomIntFromInterval(1, 13);
    }
}

// Function that put name inside the DOM
const putNameInsideDOM = () => {
    randomArray();
    let counter = 0;
    listOfName.forEach((element,index) => {
        choiceTable.forEach(value => {
            if (index == value) {
                wheelParts[counter].innerHTML = element;
                counter++;
            }
        })
    });
}

// Function that rotate the wheel
const spinTheWheel = () => {
    rotateDeg = randomIntFromInterval(1500, 2000);
    fullRotate += rotateDeg;
    containerWheel.style.transform = `rotate(${fullRotate}deg)`;
    containerWheel.style.transition = `5s`;
}

// WORK
button.addEventListener('click', () => {
    putNameInsideDOM();
    setTimeout(() => {
        spinTheWheel();
    }, 1000)
})

