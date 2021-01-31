let penDown = false;
let colorOfPen = "black";
let drawingZone = document.querySelector("#drawingZone");
let clearButton = document.querySelector("#clearButton");
let updateGridButton = document.querySelector("#updateGridButton");
let blackColorPenButton = document.querySelector("#blackColorPen");
let rainbowColorPenButton = document.querySelector("#rainbowColorPen");
let addHuePenButton = document.querySelector("#addHuePen");

clearButton.addEventListener("click", clearAllSquares);
updateGridButton.addEventListener("click", updateGrid);
blackColorPenButton.addEventListener("click", updatePenColor);
rainbowColorPenButton.addEventListener("click", updatePenColor);
addHuePenButton.addEventListener("click", updatePenColor);

updateGrid(null);


function updatePenColor(e) {
    let penColor = e.target.id;
    console.log(penColor);
}
function updateGrid(e) {
    // delete previous
    let drawingZone = document.querySelector("#drawingZone");
    let childrenToRemove = drawingZone.children;
    const noOfChildren = childrenToRemove.length;
    if (childrenToRemove != null) {
        for (let i = noOfChildren - 1; i >= 0; i--) {
            childrenToRemove[i].remove();
        }
    }
    let newNumberOfRows;
    if (e == null) {
        newNumberOfRows = 10;
    }
    else {
        do {
            newNumberOfRows = prompt("How many rows or columns?");
        }
        while (newNumberOfRows <= 0 || newNumberOfRows > 100);
    }
    let widthOfDrawingZone = getComputedStyle(drawingZone).width;
    widthOfDrawingZone = widthOfDrawingZone.substring(0, widthOfDrawingZone.length - 2);
    let singleSquaresNo = newNumberOfRows * newNumberOfRows;
    for (let i = 0; i < singleSquaresNo; i++) {

        let singleSquare = document.createElement('div');
        singleSquare.setAttribute("id", "singleSquare");
        singleSquare.style.width = `${widthOfDrawingZone / newNumberOfRows}px`;
        singleSquare.style.height = `${widthOfDrawingZone / newNumberOfRows}px`;
        singleSquare.addEventListener('mousedown', colorSingleSquare);
        singleSquare.addEventListener('mouseover', colorHoveredSquare);

        drawingZone.appendChild(singleSquare);
    }
    /* allSquares.forEach(singleSquare => singleSquare.style.width = `${widthOfDrawingZone / newNumberOfRows}px`);
    allSquares.forEach(singleSquare => singleSquare.style.height = `${widthOfDrawingZone / newNumberOfRows}px`); */

}
function colorSingleSquare(e) {
    if (e.buttons == "1") {
        e.target.style.backgroundColor = "black";
    }
    e.preventDefault();
}
function colorHoveredSquare(e) {
    if (e.buttons == "1") {
        e.target.style.backgroundColor = "black";
    }
}
function clearAllSquares() {
    let allSquares = document.querySelectorAll("#singleSquare");
    allSquares.forEach(singleSquare => singleSquare.style.backgroundColor = "White");
}

