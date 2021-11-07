document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const resultDisplay = document.querySelector('.results')
  let width = 15 
  let currentShooterIndex = 202 
  let currentInvaderIndex = 2
  let alienDestroyed = []
  let results = 0
  let direction = 1
  let invaderId

  //constructing the alien invaders
  //defining which grid squares they are
  const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
  ]

  //drawing the invaders
  alienInvaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader'))

  //drawing the x-wing
  squares[currentShooterIndex].classList.add('shooter')

  //moving the x-wing horizontally 
  function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.keyCode) {
      case 37:
        if(currentShooterIndex % width !== 0) currentShooterIndex -=1
        break
      case 39:
        if(currentShooterIndex % width < width -1) currentShooterIndex +=1
        break
    }
    squares[currentShooterIndex].classList.add('shooter')
  }
  document.addEventListener('keydown', moveShooter)

  //moving the enemy coming down the screen
  function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length -1] % width === width -1

    if((leftEdge && direction === -1) || (rightEdge && direction === 1)){
      direction = width
      } else if (direction === width){
        if (leftEdge) direction = 1
        else direction = -1
        }
    for (let i = 0; i <= alienInvaders.length -1; i++){
      squares[alienInvaders[i]].classList.remove('invader')
    }
    for (let i = 0; i <= alienInvaders.length -1; i++){
      alienInvaders[i] += direction
    }
    for (let i = 0; i <= alienInvaders.length -1; i++) {
      if (!alienDestroyed.includes(i)){
        squares[alienInvaders[i]].classList.add('invader')
      }
  }

    //game is over when...the enemy crashes / meets the xwing
    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
      resultDisplay.textContent = 'GAME OVER MAN!!'
      squares[currentShooterIndex].classList.add('boom')
      clearInterval(invaderId)
    }

    //game is also over when the enemy reach the bottom of the screen
    for (let i = 0; i <= alienInvaders.length -1; i++) {
      if(alienInvaders[i] > (squares.length - (width-1))) {
        resultDisplay.textContent = 'GAME OVER MAN!!'
        clearInterval(invaderId)
      }
    }

    //When all enemies are destroyed
    if(alienDestroyed.length === alienInvaders.length) {
      resultDisplay.textContent = 'YOU WIN!!'
      clearInterval(invaderId)
    }
  }
  //invoking the above every 500 milisecs
  invaderId = setInterval(moveInvaders, 500)    


  //to enable the xwing to shoot lasers
  function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex
  //laser now moves towards the enemy
  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= width
    squares[currentLaserIndex].classList.add('laser')

    if(squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.remove('invader')
      squares[currentLaserIndex].classList.add('boom')

      setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
      clearInterval(laserId)

      // const alienDestroyed = alienInvaders.indexOf(currentLaserIndex)
      alienDestroyed.push(alienInvaders.indexOf(currentLaserIndex))
      results++
      resultDisplay.textContent = results
    }

    if(currentLaserIndex < width) {
      clearInterval(laserId)
      setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100)
    }
  }

    switch(e.keyCode) {
      case 32:
        laserId = setInterval(moveLaser, 100)
        break    
    }
  }

  document.addEventListener('keydown', shoot)
})
