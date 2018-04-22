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

/*
*method draw() draws a Ball on the canvas
*/
Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

Ball.prototype.update = function(){
  if((this.x + this.size) >= width){ //if Ball goes out of the screen on the right
    this.velX = -(this.velX); //bring it back by moving the ball left
  }

  if((this.x - this.size) <= 0) { //if Ball goes out of the screen on the left
    this.velX = -(this.velX); //bring it back by moving the ball right
  }

  if((this.y - this.size) <= 0) { //if Ball goes out of the screen on the top
    this.velY = -(this.velY); //bring it back by moving the ball downwards
  }

  if((this.y + this.size) >= height) { //if Ball goes out of the screen at the bottom
    this.velY = -(this.velY);  //bring it back by moving the ball upwards
  }

  this.x += this.velX;
  this.y += this.velY;
};

var balls = []; //to hold the Ball objects

/*
* loop() covers the canvas with a semi-black rectangle each time it runs
* it also create 25 Ball objects and stores them in the balls array
* it also draws and updates all the Ball objects in the balls array
* then runs itself recursively using requestAnimationFrame() function
*/
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  while(balls.length < 25){
    var ball = new Ball(
      random(0, width),
      random(0, height),
      random(-7, 7),
      random(-7, 7),
      'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
      random(10, 20)
    );
    balls.push(ball);
  }

  for(var i=0; i < balls.length; i++){
    balls[i].draw();
    balls[i].update();
  }

  requestAnimationFrame(loop);
}

loop();
