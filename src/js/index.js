/*const { isArrowFunctionExpression } = require("babel-types");*/
const { isArrowFunctionExpression } = ("babel-types");

const containerNode = document.getElementById('fifteen');
const itemNodes = Array.from(containerNode.querySelectorAll('.item'));
const countItems = 16;
let swapsCounter = 0;
const result = document.getElementById('result');
const podelitsya = document.getElementById('share');

if (itemNodes.length !== 16) {
    throw new Error(`Должно быть ровно ${countItems} items in HTML`);
}

itemNodes[countItems - 1].style.display = 'none';
let matrix = getMatrix(
    itemNodes.map((item) => Number(item.dataset.matrixId))
);

setPositionItems(matrix);

/* Кнопка перемешать2 */
let autoId = 0;
const knopkaSmartShuffle = document.getElementById('auto');

knopkaSmartShuffle.addEventListener('click', () => {
    if(!autoId) {
        autoId = setInterval(() => {
            itemNodes[Math.floor(Math.random() * itemNodes.length)].click()
        }, 10);
        knopkaSmartShuffle.classList.add('activeNow');
        knopkaSmartShuffle.textContent='Хватит';
        console.log('click')
    }
    else {
        clearInterval(autoId);
        autoId = 0;
        knopkaSmartShuffle.classList.remove('activeNow');
        knopkaSmartShuffle.textContent='Еще мешай';
        console.log('unclick')
        swapsCounter = 0;
        result.classList.add('showResult');
        result.textContent='Ваш результат: ';
    }

})

const blankNumber = 16;
containerNode.addEventListener('click', (event) => {
    const buttonNode = event.target.closest('button');
    if (!buttonNode) {
        return;
    }

    const buttonNumber = Number(buttonNode.dataset.matrixId);
    const buttonCoords = findCoordinatesByNumber(buttonNumber, matrix);
    const blankCoords = findCoordinatesByNumber(blankNumber, matrix);
    const isValid = isValidForSwap(buttonCoords, blankCoords);
    if (isValid) {
        swap(blankCoords, buttonCoords, matrix);
        setPositionItems(matrix);
    }
})
/* Перемещение стрелками */
window.addEventListener('keydown', (event) => {
   if(!event.key.includes('Arrow')) {
       return;
   }
   
   const blankCoords = findCoordinatesByNumber(blankNumber, matrix);
   const buttonCoords = {
       x: blankCoords.x,
       y: blankCoords.y,
   };
   const direction = event.key.split('Arrow')[1].toLowerCase();
   const maxIndexMatrix = matrix.length;

   switch (direction) {
        case 'up':
            buttonCoords.y += 1;
            break;
        case 'down':
            buttonCoords.y -= 1;
            break;
        case 'left':
            buttonCoords.x += 1;
            break;
        case 'right':
            buttonCoords.x -= 1;
            break;
   }

   if (buttonCoords.y >= maxIndexMatrix || buttonCoords.y < 0 || buttonCoords.x >= maxIndexMatrix || buttonCoords.x < 0) {
    return
   }

   swap(blankCoords, buttonCoords, matrix);
   setPositionItems(matrix);   
})





function getMatrix(arr) {
    const matrix = [[], [], [], []];
    let x = 0;
    let y = 0;
    
    for (let i = 0; i < arr.length; i++) {
        if (x >= 4) {
            y++;
            x = 0;
        }
        matrix[y][x] = arr[i];
        x++;
    }

    return matrix;
}

function setPositionItems(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const value = matrix[y][x];
            const node = itemNodes[value - 1];
            setNodeStyles(node, x, y);
        }
    }
}

function setNodeStyles(node, x, y) {
    const shiftPs = 100;
    node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`
}

function shuffleArray(arr) {
    return arr
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

function findCoordinatesByNumber(number, matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === number) {
                return {x,y};
            }
        }
    }
    return null;
}

function isValidForSwap(coords1,coords2) {
    const diffX = Math.abs(coords1.x - coords2.x);
    const diffY = Math.abs(coords1.y - coords2.y);

    return (diffX === 1 || diffY === 1) && (coords1.x === coords2.x || coords1.y === coords2.y)
}

function swap(coords1, coords2, matrix) {
    matrix[coords2.y][coords2.x] = [matrix[coords1.y][coords1.x], matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x]][0];
    swapsCounter ++;
    console.log(swapsCounter);
    result.textContent='Ваш результат: '+swapsCounter;
    /* показать что победил */
    if (isWon(matrix)) {
        addWonClass();
        knopkaSmartShuffle.textContent='Играть еще раз';
        podelitsya.classList.remove('shareHide');
    }
}

/* показать что победил */
const winFlatArray = new Array(16).fill(0).map((_item, i) => i + 1);

function isWon(matrix) {
    const flatMatrix = matrix.flat();
    for(let i = 0; i < winFlatArray.length; i++) {
        if (flatMatrix[i] !== winFlatArray[i]) {
            return false;
        }
    }

    return true;
}

const wonClass = 'fifteenWon'
function addWonClass() {
    setTimeout(() => {
        containerNode.classList.add(wonClass);

        setTimeout(() => {
            containerNode.classList.remove(wonClass);
        }, 1000)
    }, 200)
}

/* подсказка про управление стрелочками */
const kartinka = document.getElementById('hint');
setTimeout(() => {
        kartinka.classList.add('podskazkaShow');

        setTimeout(() => {
            kartinka.classList.remove('podskazkaShow');
        }, 2000)
    }, 1000)

/* Кнопка поделиться */
document.write(VK.Share.button({url: 'https://nazmiev.github.io/fifteen/', title: 'Сможешь побить мой рекорд в пятнашках?'}, {type: 'custom', text: '<img src="http://vk.com/images/vk32.png" />'}));