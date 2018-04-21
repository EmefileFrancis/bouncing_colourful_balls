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
