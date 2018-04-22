require.config({
  baseUrl: './',
  packages: [
    {
      name: 'physicsjs',
      location: '/PhysicsJS',
      main: 'physicsjs-0.7.0.min'
    }
  ],
});

//require(['physicsjs'], function(Physics){
  //Physics(function(){
    //var world = this;
  //});
//});


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

function Shape(x, y , velX, velY, exists){
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

function Ball(x, y, velX, velY, exists, color, size){
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;


/*
*method draw() draws a Ball on the canvas
*/
Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

/*
*method update() implements edge-collision-detection
*and updates the this.x and this.y by adding this.velX and this.velY respectively
*/
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

Ball.prototype.collisionDetect = function() {
    for(var j = 0; j<balls.length; j++) {
      if(!(this === balls[j])) {
        var dx = this.x - balls[j].x;
        var dy = this.y - balls[j].y;
        var distance = Math.sqrt(dx*dx + dy*dy); //distance between to points
        if(distance < this.size + balls[j].size){
          this.color = balls[j].color = 'rgb(' + random(0, 255) + ',' +
                                                random(0, 255) + ',' +
                                                random(0, 255) + ')';
        }
      }
    }

};

function EvilCircle(x, y, exists, color, size, velX, velY){
  Shape.call(this, x, y, exists);
  this.color = 'white';
  this.size = 10;
  this.velX = 20;
  this.velY = 20;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

/*
*method draw() draws the EvilCircle on the canvas
*/
EvilCircle.prototype.draw = function(){
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};

/*
*method checkBounds() checks whether the EvilCircle is going off the edge of the screen
*edge-collision-detection mechanism
*/
EvilCircle.prototype.checkBounds = function(){
  if((this.x + this.size) >= width){ //if EvilCircle goes out of the screen on the right
    this.x = this.x - this.size; //bring it back by moving the EvilCircle left
  }

  if((this.x - this.size) <= 0) { //if EvilCircle goes out of the screen on the left
    this.x = this.x + this.size; //bring it back by moving the EvilCircle right
  }

  if((this.y - this.size) <= 0) { //if EvilCircle goes out of the screen on the top
    this.y = this.y + this.size; //bring it back by moving the EvilCircle downwards
  }

  if((this.y + this.size) >= height) { //if EvilCircle goes out of the screen at the bottom
    this.y3 = this.y - this.size;  //bring it back by moving the EvilCircle upwards
  }

};

/*
*method setControls() implements the functionality that enables the
*EvilCircle to be moved using the arrow keys
*/
EvilCircle.prototype.setControls = function() {
  var _this = this;
  window.onkeydown = function(e) {
    if(e.keyCode === 37){ //right
      _this.x -= _this.velX;
    }else if(e.keyCode === 39){ //left
      _this.x += _this.velX;
    }else if(e.keyCode === 38){ // down
      _this.y -= _this.velY;
    }else if(e.keyCode === 40){ //up
      _this.y += _this.velY;
    }
  };
}

EvilCircle.prototype.collisionDetect = function() {
    for(var j = 0; j<balls.length; j++) {
      if(balls[j].exists) { //check to see if the ball has not been destroyed
        var dx = this.x - balls[j].x;
        var dy = this.y - balls[j].y;
        var distance = Math.sqrt(dx*dx + dy*dy); //distance between to points
        if(distance < this.size + balls[j].size){
          balls[j].exists = false;
          ballCount--;
          paragraph.textContent = 'Ball Count: ' + ballCount;
        }
      }
    }

};

var balls = []; //to hold the Ball objects
var ballCount = 0;

var paragraph = document.querySelector('p');

var evilCircle = new EvilCircle(random(0, width), random(0, height), true);
evilCircle.setControls();
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
      true,
      'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
      random(10, 20)
    );
    balls.push(ball);
    ballCount++;
    paragraph.innerHTML = 'Ball count: ' + ballCount;
  }

  for(var i=0; i < balls.length; i++){
    if(balls[i].exists){
      balls[i].draw();

      balls[i].update();
      balls[i].collisionDetect();
    }

  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();
  requestAnimationFrame(loop);
}

loop();
