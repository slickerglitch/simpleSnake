const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const blockSize = 10;
const widthInBlocks = width / blockSize;
const heightInBlocks = height / blockSize;

let score = 0;

const intervalID = setInterval(function () {
  ctx.clearRect(0, 0, width, height);
  drawScore();
  snake.move();
  snake.draw();
  apple.draw();

  drawBorder();
}, 100);

const drawBorder = function () {
  ctx.fillStyle = 'Gray';

  ctx.fillRect(0, 0, width, blockSize);
  ctx.fillRect(0, height - blockSize, width, blockSize);
  ctx.fillRect(0, 0, width, blockSize);
  ctx.fillRect(width - blockSize, 0, blockSize, height);
};

const drawScore = function () {
  ctx.font = '20px Courier';
  ctx.fillStyle = 'Black';
  ctx.textAlign = 'left';
  ctx.textBaseLine = 'top';
  ctx.fillText('Score: ' + score, blockSize, blockSize);
};
