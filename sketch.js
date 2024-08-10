const BLANK = -1;

let source;
let tiles = [];
let cols = 4;
let rows = 4;
let w, h;
let board = [];

function preload() {
  source = loadImage('dscvr.jpeg');
}

function setup() {
  createCanvas(480, 480);
  w = width / cols;
  h = height / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = i * w;
      let y = j * h;
      let img = source.get(x, y, w, h);
      let index = i + j * cols;
      board.push(index);
      tiles.push(new Tile(index, img));
    }
  }

  tiles.pop();
  board.pop();
  board.push(BLANK);
  shuffler(board);
}

function swap(i, j, arr) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function randomMove(arr) {
  let r1 = floor(random(cols));
  let r2 = floor(random(rows));
  moveTile(r1, r2, arr);
}

function shuffler(arr) {
  for (let i = 0; i < 1000; i++) {
    randomMove(arr);
  }
}

function mousePressed() {
  let i = floor(mouseX / w);
  let j = floor(mouseY / h);
  moveTile(i, j, board);
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = i + j * cols;
      let x = i * w;
      let y = j * h;
      let tileIndex = board[index];
      if (tileIndex !== BLANK) {
        let img = tiles[tileIndex].img;
        image(img, x, y);
      }
    }
  }

  noFill();
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      rect(i * w, j * h, w, h);
    }
  }

  if (isSolved()) {
    console.log("Solved");
  }
}

function isSolved() {
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== tiles[i].index) {
      return false;
    }
  }
  return true;
}

function moveTile(i, j, arr) {
  let blank = findBlank();
  let blankCol = blank % cols;
  let blankRow = Math.floor(blank / cols); // Usando divisão inteira

  if (isNeighbor(i, j, blankCol, blankRow)) {
    swap(blank, i + j * cols, arr);
  }
}

function isNeighbor(i, j, x, y) {
  return (i === x && abs(j - y) === 1) || (j === y && abs(i - x) === 1);
}

function findBlank() {
  return board.indexOf(BLANK);
}