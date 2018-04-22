var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d'); //This gets the drawing area on the canvas

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

/*
*random() takes two numbers and
*returns a number within the range of both numbers
*/
function random(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Ball(x, y , velX, velY, color, size){
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};
