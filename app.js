//creating a const defining the game board div
const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");

//creating 3 * 3 cells as an array
const startCells = ["", "", "", "", "", "", "", "", ""];
let go = "circle"

infoDisplay.textContent = "Circle goes first";

//creating the game board
function createBoard() {
  //cell = 9 from startCells
  startCells.forEach((_cell, index) => {
    //create divs and naming them cellElement
    const cellElement = document.createElement("div");
    //style the cells
    cellElement.classList.add("square");

    cellElement.id = index
    cellElement.addEventListener("click", addGo)

    //and put those divs into the gameBoard
    gameBoard.append(cellElement);
  });
}

createBoard()

function addGo(e) {
    console.log("clicked", e)
    const goDisplay = document.createElement("div")
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "It is now " + go + "'s turn"
    e.target.removeEventListener("click", addGo)
    checkScore()
}

function checkScore(){
    const allSquares = document.querySelectorAll(".square")
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    winningCombos.forEach(array => {
        const circleWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains("circle"))
            if(circleWins) {
                infoDisplay.textContent = "Circle Wins!"
                allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            }
    })

   

    winningCombos.forEach(array => {
        const crossWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains("cross"))
            if(crossWins) {
                infoDisplay.textContent = "Cross Wins!"
                allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            }
    })

}