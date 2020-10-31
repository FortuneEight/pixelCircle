const colorFill = "black";
const colorGridStroke = "white";
const colorCenter = "yellow";
const colorCircumference = "red";

let strokeGridWeight, gridWidth, cellNumber, cellSize, pieDiv;

function initialize() {
    strokeGridWeight = 1;
    gridWidth = 900;
    cellNumber = 3;
    cellSize = gridWidth / cellNumber;
    pieDiv = createDiv().style('font-size', '18pt');
}

function setup() {
    initialize();
    createCanvas(gridWidth, gridWidth);
    frameRate(1 / 5);
    // noLoop();
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