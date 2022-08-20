const canvas = document.getElementById('canvas');
const contex = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const blockSize = 10;

const widthInBlocks = width / blockSize;
const heightInBlocks = height / blockSize;

let score = 0;

const intervalId = setInterval(() => { 
  contex.clearRect(0 , 0, width, height);
  
  drawScore();

  snake.move();
  snake.draw();
  apple.draw();

  drawBorder();
  //drawSquare(); 

}, 50); // Snake travel speed set with setInterval built-in function

const drawBorder = () => {
  contex.fillStyle = 'Gray';
  contex.fillRect(0, 0, width, blockSize);
  contex.fillRect(0, height - blockSize, width, blockSize);
  contex.fillRect(0, 0, blockSize, width);
  contex.fillRect(width - blockSize, 0, blockSize, height);
};

const drawScore = () => {
  contex.font = '15px Menlo';
  contex.fillStyle = 'Brown';
  contex.textAlign = 'left';
  contex.textBaseline = 'top';
  contex.fillText('points ' + score, blockSize + 10, blockSize + 10);
  //contex.fillText('Ssssssuper Snake!', 50, 50);
  //contex.fillText('points ' + score, 50, 50);
};

const endGame = () => { 
  clearInterval(intervalId); // call inbuilt fxn: clearInterval
  contex.font = '60px Menlo';
  contex.fillStyle = 'Black';
  contex.textAlign = 'center';
  contex.textBaseline = 'middle';
  contex.fillText('Game Over', width / 2, height / 2);
  //return;
};

const spectrapple = ['Red', 'Orange', 'Magenta', 'Yellow', 'Green'];

// Directions Assigned to Keys
const directions = {
  38: 'top',
  40: 'down',
  39: 'right',
  37: 'left',
};

const circle = (x, y, radius, fillCircle) => { 
  contex.beginPath(); 
  contex.arc(x, y, radius, 0, Math.PI * 2, false);
  fillCircle ? contex.fill() : contex.stroke(); 
};



//#region Block
// Block Constructor
const Block = function (col, row) {  //hue) { 
  this.col = col;
  this.row = row; 
  //this.hue = hue; 
};

// Block Methods
Block.prototype.drawSquare = function (color) {
  // Draw a square at Block's location to illustrate it in the DOM
  let x = this.col * blockSize;
  let y = this.row * blockSize;

  contex.fillStyle = color;

  contex.fillRect(x, y, blockSize, blockSize);
};

Block.prototype.drawCircle = function (color) {
  // Draw a circle at Block's location
  let centerX = this.col * blockSize + blockSize / 2;
  let centerY = this.row * blockSize + blockSize / 2;

  contex.fillStyle = color;

  circle(centerX, centerY, blockSize / 2, true); // Fxn call
};

Block.prototype.equal = function (block) {
  return this.col === block.col && this.row === block.row; // Validate placement
};

//#endregion Block


//#region Snake

// Snake Constructor
const Snake = function() { 
  // Snake's body is composed of individual 'blocks' on the `segments` array
  this.segments = [
    new Block(7, 5),
    new Block(6, 5),
    new Block(5, 5), 
  ];

  this.direction = 'right'; // directionent direction of travel
  this.nextDirection = 'right'; // Subsequent direction of travel
};

// Snake Methods
Snake.prototype.draw = function() { 
  for (let i = 0; i < this.segments.length; i++) { 
    this.segments[i].drawSquare('Green'); 
  }
};

Snake.prototype.move = function() {
  const head = this.segments[0];
  let newHead;

  // Take the directional state of travel and update it to the nextDirection
  this.direction = this.nextDirection;

  this.direction === 'right' ? newHead = new Block(head.col + 1, head.row)
    : this.direction === 'down' ? newHead = new Block(head.col, head.row + 1)
      : this.direction === 'left' ? newHead = new Block(head.col - 1, head.row)
        : newHead = new Block(head.col, head.row - 1); 
  
  if (this.bump(newHead)) {
    endGame();
    return;
  }

  this.segments.unshift(newHead);

  // Validate the apple's directionent position, update score, move apple
  if (newHead.equal(apple.posit)) {
    score++;
    apple.move();
    // apple.redShift(); 
  } else {
    this.segments.pop();
  }
  // // -Note-> Do I want to change the conditions for when the apple is re-placed?
  // Why or why not?
  //newHead.equal(apple.posit) ? score++ : this.segments.pop();
};

// Snake method `bump` handles collisions
Snake.prototype.bump = function (head) {
  let topBump = head.col === 0;
  let downBump = head.row === 0;
  let rightBump = head.col === widthInBlocks;
  let leftBump = head.row === heightInBlocks;
  let selfBump = false; // Start with `selfBump` state set to false
  const wallBump = topBump || downBump || rightBump || leftBump;

  // Traverse `segments` array and verify position of the head
  for (let i = 0; i < this.segments.length; i++) {
    if (head.equal(this.segments[i])) {
      selfBump = true; // Ouch. :(
    }
  }

  return wallBump || selfBump;
};

Snake.prototype.tack = function (newDirection) {
  if (this.direction === 'top' && newDirection === 'down') { 
    return;
  } else if (this.direction === 'right' && newDirection === 'left') { 
    return;
  } else if (this.direction === 'down' && newDirection === 'top') { 
    return;
  } else if (this.direction === 'left' && newDirection === 'right') {
    return;
  }

  this.nextDirection = newDirection; 
}; 
//#endregion Snake
const snake = new Snake();


// Event Handler
$('body').keydown((keystroke) => { 
  const newDirection = directions[keystroke.keyCode];

  if (newDirection !== 'undefined') { 
    snake.tack(newDirection);
  }
});

//#region Apple
// Apple Constructor && Methods
const Apple = function() { 
  this.posit = new Block(10, 10);
};

Apple.prototype.draw = function () {
  //this.posit.drawCircle(spectrapple[0]);
  this.posit.drawCircle(spectrapple[Math.floor(Math.random() * spectrapple.length) + 1]);
  //this.posit.drawCircle(hue); 

};

Apple.prototype.move = function() { 
  let randoCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
  let randoRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
  //let randoHue = spectrapple[Math.floor(Math.random() * spectrapple.length) + 1];
  this.posit = new Block(randoCol, randoRow); //randoHue);
};

const apple = new Apple(); 

//#endregion Apple

// // Use `Snake` && `Apple` constructors to create their respective objects


apple.draw(); 
snake.draw(); 