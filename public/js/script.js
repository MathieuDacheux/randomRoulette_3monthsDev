/************************ ************************/
/******************* VARIABLES *******************/
/************************ ************************/

// Variables permettant la rotation du container containerWheel
let rotateDeg;
let fullRotate = 0;

// Tableau avec l'ensemble des noms de la classe
let listOfName = ['Claude', 'Damien', 'Tristan', 'Laura', 'Paul', 'Alexis G', 'Alexis F', 'Nassim', 'Muriel', 'Anthonin', 'Christopher', 'Mathieu', 'Daniel'];

// LocalStorage de listOfName
studentsClass = JSON.parse(localStorage.getItem('studentsClass')) || [];

// Tableau de l'ensemble des choix générés aléatoirement
let choiceTable = [];

// Tableau de l'ensemble des <div> du DOM
const wheelParts = [
    caseOne = document.querySelector('.name1'),
    caseTwo = document.querySelector('.name2'),
    caseThree = document.querySelector('.name3'),
    caseFour = document.querySelector('.name4'),
    caseFive = document.querySelector('.name5'),
    caseSix = document.querySelector('.name6')
];

// Triangle rouge
const redTriangle = document.querySelector('.redTriangle');

// Container de la roue
const containerWheel = document.querySelector('.spinningWheel');

// Button d'actionnement
const button = document.querySelector('input');

// Container du gagnant
const winner = document.querySelector('.winnerName h2');

/************************ ************************/
/******************* FONCTIONS *******************/
/************************ ************************/

// Mise en place de la liste des élèves dans le localStorage
const checkLocalStorage = () => {
    if (localStorage.getItem('studentsClass') === null) {
        listOfName.forEach(element => {
            item = {
                name: element,
                correction: false,
            };
            studentsClass.push(item);
            localStorage.setItem('studentsClass', JSON.stringify(studentsClass));
        })
    } else {
        return true;
    }
}

// Génération d'un nombre aléatoire dans un intervalle 
const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Génération d'un nombre aléatoire unique en comparant avec l'ancien tableau
const generateNewUniqueValue = (maxLenght, min, max) => {
    let counter = 0;
    choiceTable = [];
    let indexCorrectionTrue = [];
    studentsClass.forEach((element, index) => {
        if (element.correction == true) {
            indexCorrectionTrue.push(index);
            counter ++;
        }   
    });
    if (counter < 8) {
        for (let i = 0; i <= maxLenght; i++) {
            newRandomValue = randomIntFromInterval(min, max);
            if (indexCorrectionTrue.includes(newRandomValue) == true || choiceTable.includes(newRandomValue) == true) {
                i--;
            } else {
                choiceTable.push(newRandomValue);
            }
        }
    } else {
        while (choiceTable.length < 6) {
            newRandomValue = randomIntFromInterval(min, max);
            if (indexCorrectionTrue.includes(newRandomValue) == false) {
                choiceTable.push(newRandomValue);
            }
        }
    }
}

// Génération des éléments de wheelParts en fonctions des nombres générés par la fonction randomArray
const putNameInsideDOM = () => {
    generateNewUniqueValue(5, 0, 12);
    let counter = 0;
    studentsClass.forEach((element,index) => {
        choiceTable.forEach(value => {
            if (index == value) {
                wheelParts[counter].innerHTML = element.name;
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

// Calcul de l'élement la <div> la plus proche du top de l'écran
const distanceTopAndDiv = () => {
    distanceArray = [];
    wheelParts.forEach(element => {
        distanceCalc = element.getBoundingClientRect().top;
        distanceArray.push(distanceCalc);
    })
    return distanceArray;
}

// Trouver l'élément <div> le plus proche en comparant distanceArray & wheelParts
const compareWheelPartsDistanceArray = () => {
    let minValue = Math.min(...distanceArray);
    let minIndex = distanceArray.indexOf(minValue);
    winner.innerHTML = wheelParts[minIndex].textContent;
    let index = studentsClass.findIndex(item => item.name === wheelParts[minIndex].textContent);
    replaceItem = {
        name: wheelParts[minIndex].textContent,
        correction: true,
    };
    studentsClass.splice(index, 1, replaceItem);
    localStorage.setItem('studentsClass', JSON.stringify(studentsClass));
}

// Vérification du nombre de correction : true dans le LS
const verificationCounterCorrection = () => {
    let counter = 0;
    studentsClass.forEach(element => {
        if (element.correction == true) {
            counter++;
        }
    })
    if (counter == 13) {
        studentsClass.forEach((element, index) => {
            replaceItem = {
                name: element.name,
                correction: false,
            }
            studentsClass.splice(index, 1, replaceItem);
            localStorage.setItem('studentsClass', JSON.stringify(studentsClass));
        })
    }
}

/************************ ************************/
/********************** Work *********************/
/************************ ************************/

window.addEventListener('load', () => {
    checkLocalStorage();
})

button.addEventListener('click', () => {
    verificationCounterCorrection();
    putNameInsideDOM();
    setTimeout(() => {
        spinTheWheel();
    }, 1000)
    setTimeout(() => {
        distanceTopAndDiv();
        compareWheelPartsDistanceArray();
    }, 7000)
})