const colorFill = "black";
const colorGridStroke = "white";
const colorCenter = "yellow";
const colorCircumference = "red";

let strokeGridWeight, gridWidth, cellNumber, cellSize, pieDiv;
let btns;
let canvas;

function initialize() {
    strokeGridWeight = 1;
    gridWidth = 900;
    cellNumber = 7;
    cellSize = gridWidth / cellNumber;
    pieDiv = createDiv().style('font-size', '18pt');
    createButtons(btns);
}

function createButtons(buttons) {
    buttons = [];
    buttons[0] = createButton('3').style('font-size: 30pt; width: 100px; background-color: #FF0000;');
    buttons[1] = createButton('7').style('font-size: 30pt; width: 100px; background-color: #DD0022;');
    buttons[2] = createButton('15').style('font-size: 30pt; width: 100px; background-color: #BB0044;');

    buttons[0].position(gridWidth + 20, 20);
    buttons[1].position(gridWidth + 20, 80);
    buttons[2].position(gridWidth + 20, 140);


    // buttons[0].mousePressed(buttonPressed);
    // buttons[1].mousePressed(buttonPressed(7));
    // buttons[2].mousePressed(buttonPressed(15));
}

function setup() {
    initialize();
    canvas = createCanvas(gridWidth, gridWidth);
    frameRate(1 / 5);
    // noLoop();
}

function test() {
    console.log('hi there lol');
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
    cellNumber = 2 * cellNumber + 1;
    cellSize = gridWidth / cellNumber;
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
    pieDiv.html(`${sp(43)}Diameter: ${cellNumber} - Cell/Pixel Ratio: ${nf(cellSize,0,2)}`);
}