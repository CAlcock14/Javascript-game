"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var squares = document.querySelectorAll('.grid div');
  var resultDisplay = document.querySelector('#result');
  var width = 15;
  var currentShooterIndex = 202;
  var currentInvaderIndex = 0;
  var alienInvadersTakenDown = [];
  var result = 0;
  var direction = 1;
  var invaderId; //define the alien invaders

  var alienInvaders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39]; //draw the alien invaders

  alienInvaders.forEach(function (invader) {
    return squares[currentInvaderIndex + invader].classList.add('invader');
  }); //draw the shooter

  squares[currentShooterIndex].classList.add('shooter'); //move the shooter along the line

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);

  function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
    }
  }
});