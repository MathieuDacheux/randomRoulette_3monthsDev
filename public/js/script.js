/************************ ************************/
/******************* VARIABLES *******************/
/************************ ************************/

// Variables permettant la rotation du container containerWheel
let rotateDeg;
let fullRotate = 0;

// Tableau avec l'ensemble des noms de la classe
const listOfName = ['Claude', 'Damien', 'Tristan', 'Laura', 'Paul', 'Alexis G', 'Alexis F', 'Nassim', 'Muriel', 'Anthonin', 'Christopher', 'Mathieu', 'Daniel'];

// Tableau de l'ensemble des choix générés aléatoirement
let choiceTable = [];
let choiceTableTampon = [];

// Tableau de l'ensemble des <div> du DOM
const wheelParts = [
    caseOne = document.querySelector('.name1'),
    caseTwo = document.querySelector('.name2'),
    caseThree = document.querySelector('.name3'),
    caseFour = document.querySelector('.name4'),
    caseFive = document.querySelector('.name5'),
    caseSix = document.querySelector('.name6')
];

// Container de la roue
const containerWheel = document.querySelector('.spinningWheel');

// Button d'actionnement
const button = document.querySelector('input');

/************************ ************************/
/******************* FONCTIONS *******************/
/************************ ************************/

// Génération d'un nombre aléatoire dans un intervalle 
const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Génération d'un nombre aléatoire unique
const generateUniqueValue = (maxLenght, min, max, array) => {
    for (i = 0; i <= maxLenght; i++) {
        randomValue = randomIntFromInterval(min, max);
        if (array.includes(randomValue) == true) {
            i--;
        } else {
            if (randomValue > max == false) {
                array.push(randomValue)
            }
        }
    }
}

// Génération d'un nombre aléatoire unique en comparant avec l'ancien tableu
const generateNewUniqueValue = (maxLenght, min, max, array1, array2) => {
    for (i = 0; i <= maxLenght; i++) {
        newRandomValue = randomIntFromInterval(min, max);
        if (array1.includes(newRandomValue) == true || array2.includes(newRandomValue) == true) {
            i--;
        } else {
            if (newRandomValue > max == false) {
                array2.push(newRandomValue)
            }
        }
    }
}

// Génération de nombres aléatoires uniques pour le tableau choiceTable
const putUniqueValueInsideArray = () => {
    if (choiceTable.lenght = 0) {
        generateUniqueValue(5, 1, 12, choiceTable);
    } else {
        choiceTableTampon = choiceTable;
        choiceTable = [];
        generateNewUniqueValue(5, 1, 12, choiceTableTampon, choiceTable);
    }
    return choiceTable;
}

// Génération des éléments de wheelParts en fonctions des nombres générés par la fonction randomArray
const putNameInsideDOM = () => {
    putUniqueValueInsideArray();
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

// Génération de la rotation de containerWheel
const spinTheWheel = () => {
    rotateDeg = randomIntFromInterval(1500, 2000);
    fullRotate += rotateDeg;
    containerWheel.style.transform = `rotate(${fullRotate}deg)`;
    containerWheel.style.transition = `5s`;
}

/************************ ************************/
/********************** Work *********************/
/************************ ************************/

button.addEventListener('click', () => {
    putNameInsideDOM();
    setTimeout(() => {
        spinTheWheel();
    }, 1000)
})