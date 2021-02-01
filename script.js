let penDown = false;
let colorOfPen = "black";
let drawingZone = document.querySelector("#drawingZone");
let clearButton = document.querySelector("#clearButton");
let updateGridButton = document.querySelector("#updateGridButton");
let blackColorPenButton = document.querySelector("#blackColorPen");
let rainbowColorPenButton = document.querySelector("#rainbowColorPen");
let addHuePenButton = document.querySelector("#addHueColorPen");

clearButton.addEventListener("click", clearAllSquares);
updateGridButton.addEventListener("click", updateGrid);
blackColorPenButton.addEventListener("click", updatePenColor);
rainbowColorPenButton.addEventListener("click", updatePenColor);
addHuePenButton.addEventListener("click", updatePenColor);

updateGrid(null);

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
  
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
  
    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
  
      h /= 6;
    }
  
    return [ h, s, l ];
  }

function randomColor() {
    let hue = Math.floor(Math.random() * 360);
    let color = `hsl(${hue}, 100%, 50%)`;
    console.log(color);
    return color;
}

function darkenColor(oldColor) {
    if(oldColor == "")
    {
        oldColor = "hsl(0, 0%, 90%)";
        return oldColor;
    }

    let arrRGB = oldColor.slice(4, -1);
    arrRGB = arrRGB.split(",");
    let arr = rgbToHsl(arrRGB[0], arrRGB[1], arrRGB[2]);    
    arr[2] -= 0.1;
    (arr[2] <= 0) ? arr[2] = "0" : false;
    let newColor = `hsl(${arr[0]*360}, ${arr[1]*100}%, ${arr[2]*100}%)`;
    return newColor;  


}

function updatePenColor(e) {
    let penColor = e.target.id;
    penColor = penColor.slice(0, -8);
    colorOfPen = penColor;
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
        newNumberOfRows = 15;
    }
    else {
        do {
            newNumberOfRows = prompt("How many rows/columns? (max 100)", "15");
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
        singleSquare.style.backgroundColor = "#fcfcfc";
        singleSquare.addEventListener('mousedown', colorSingleSquare);
        singleSquare.addEventListener('mouseover', colorHoveredSquare);

        drawingZone.appendChild(singleSquare);
    }
    /* allSquares.forEach(singleSquare => singleSquare.style.width = `${widthOfDrawingZone / newNumberOfRows}px`);
    allSquares.forEach(singleSquare => singleSquare.style.height = `${widthOfDrawingZone / newNumberOfRows}px`); */

}
function colorSingleSquare(e) {
    if (e.buttons == "1") {
        switch (colorOfPen) {
            case "black":
                e.target.style.backgroundColor = "black";
                break;
            case "rainbow":
                e.target.style.backgroundColor = randomColor();
                break;
            case "addHue":
                currentColor = e.target.style.backgroundColor;
                currentColor = darkenColor(currentColor);
                e.target.style.backgroundColor = currentColor;
                break;
        }
    }
    e.preventDefault();
}
function colorHoveredSquare(e) {
    if (e.buttons == "1") {
        switch (colorOfPen) {
            case "black":
                e.target.style.backgroundColor = "black";
                break;
            case "rainbow":
                e.target.style.backgroundColor = randomColor();
                break;
            case "addHue":
                currentColor = e.target.style.backgroundColor;
                currentColor = darkenColor(currentColor);
                e.target.style.backgroundColor = currentColor;
                break;
        }
    }
}
function clearAllSquares() {
    let allSquares = document.querySelectorAll("#singleSquare");
    allSquares.forEach(singleSquare => singleSquare.style.backgroundColor = "#fcfcfc");
}

