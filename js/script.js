const numSquares = 9;
const puzzleContainer = document.querySelector('.puzzle-container');
const newGameBtn = document.querySelector('.new-game');
const gridAreas = [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]];
let squaresArray = [];
let emptySquare = 9;

const swapArrayPositions = (a, b) => {
  const temp = squaresArray[a];
  squaresArray[a] = squaresArray[b];
  squaresArray[b] = temp;
};

const moveSquare = e => {
    const targetSquare = e.target;
    const getSquareindex = squaresArray.indexOf(targetSquare) + 1;
    const currentGridArea = gridAreas[getSquareindex - 1];
    // Check if square can move
    if (getSquareindex - 1 > 0 && getSquareindex - 1 === emptySquare ||
        getSquareindex + 1 <= numSquares && getSquareindex + 1 === emptySquare||
        getSquareindex - 3 > 0 && getSquareindex - 3 === emptySquare ||
        getSquareindex + 3 <= numSquares && getSquareindex + 3 === emptySquare) {
            // Switch target square with white(empty) square
            targetSquare.style.gridArea = `${gridAreas[emptySquare -1][0]} / ${gridAreas[emptySquare - 1][1]}`;
            squaresArray[emptySquare -1].style.gridArea = `${currentGridArea[0]} / ${currentGridArea[1]}`;
            // Update square positions in array and the position of the empty square
            swapArrayPositions(getSquareindex -1, emptySquare - 1);
            emptySquare = getSquareindex;
    }
};

const startNewGame = () => {
    let row = 1;
    let column = 1

    squaresArray.sort(() => Math.random() - 0.5);

    puzzleContainer.innerHTML = '';

    squaresArray.forEach((square, index) => {
        if (square.classList.value === 'square-9') {
            emptySquare = index + 1;
        }
        // positions for shuffled squares on the grid
        square.style.gridArea = `${row} / ${column}`;
        square.addEventListener('click', moveSquare);

        puzzleContainer.appendChild(square);

        if ((index + 1) % 3 === 0) {
            row++;
            column = 1;
        } else {
            column++;
        }
    });
}

const createSquares = squares => {
    for (var i = 1; i <= numSquares; i++) {
        const square = document.createElement('div');
        square.classList.add(`square-${i}`);

        puzzleContainer.appendChild(square);

        squaresArray.push(square);
    }

    newGameBtn.addEventListener('click', startNewGame);
}

const init = () => createSquares(numSquares);

window.addEventListener('load', init);
