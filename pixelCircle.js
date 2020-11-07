const colorFill = "black";
const colorGridStroke = "white";
const colorCenter = "yellow";
const colorCircumference = "red";
const btnLabels = ['3', '7', '15', '31', '63', '127', '255', '511', '1023'];
const btnColors = ['#FF0000', '#DD0022', '#BB0044', '#880066', '#660088', '#440066', '220088', '0000BB', '0000FF'];

let strokeGridWeight, gridWidth, cellNumber, cellSize, pieDiv;
let btnArray;
let canvas;

function initialize() {
    strokeGridWeight = 1;
    gridWidth = 1024;
    cellNumber = 3;
    cellSize = gridWidth / cellNumber;
    pieDiv = createDiv().style('font-size', '18pt');
    createButtons(btnArray, btnLabels, btnColors);
}

function createButtons(buttons, buttonLabels, buttonColors) {
    buttons = [];

    const spacingHorizontal = 20;
    const spacingVertical = 20;

    for (let i = 0; i < buttonLabels.length; i++) {

        buttons[i] = createButton(buttonLabels[i]).style(`font-size: 18pt;
                                                            width: 100px;
                                                            background-color: ${buttonColors[i]}`);
        buttons[i].position(gridWidth + spacingHorizontal, 2 * spacingVertical * i);
        buttons[i].id(i);
        // let btnID = i;
        document.getElementById(i).onclick = function() { btnClicked(i) };
    }
}

function btnClicked(buttonID) {
    cellNumber = 2 ** (buttonID + 2) - 1;
    cellSize = gridWidth / cellNumber;
    if (cellNumber > 500) {
        strokeGridWeight = 0;
    } else {
        strokeGridWeight = 1;
    }


    loop();
}

function setup() {
    initialize();
    canvas = createCanvas(gridWidth, gridWidth);
    frameRate();
}

function draw() {
    background("black");
    if (cellNumber > 500) {
        strokeGridWeight = 0;
        noLoop();
    }
    drawGrid(cellSize, cellNumber);
    fill(colorCenter);
    squCtr(0, 0, cellSize, cellNumber);
    drawCircle(cellNumber, cellSize);
    output();
    noLoop();
}

function drawGrid(cWidth, cNum) {
    stroke(colorGridStroke);
    strokeWeight(strokeGridWeight);
    fill(colorFill);

    for (let x = 0; x < cNum; x++) {
        for (let y = 0; y < cNum; y++) {
            square(x * cWidth, y * cWidth, cWidth);
        }
    }

}

function drawCircle(cNum, cWidth) {
    const radius = floor(cNum / 2);
    fill(colorCircumference);
    for (let x = -radius; x <= radius; x++) {
        let y = round(sqrt(radius ** 2 - x ** 2));
        squCtr(x, y, cWidth, cNum);
        squCtr(x, -y, cWidth, cNum);
    }

    for (let y = -radius; y <= radius; y++) {
        let x = round(sqrt(radius ** 2 - y ** 2));
        squCtr(x, y, cWidth, cNum);
        squCtr(-x, y, cWidth, cNum);
    }
}

function output() {
    pieDiv.html(`${sp(55)}Diameter: ${cellNumber} - Cell/Pixel Ratio: ${nf(cellSize,0,2)}`);
}