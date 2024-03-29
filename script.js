  import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle (document.getElementById("player-paddle"));
const computerPaddle = new Paddle (document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")


let lastTime
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime
        runPressedButtons()
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        if(isLose()) handleLose()

    }

    lastTime = time
    window.requestAnimationFrame(update)
}

function isLose(){
    const rect = ball.rect();
    return  rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
    const rect = ball.rect()
    if(rect.right >= window.innerWidth){
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    }else{
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }
    ball.reset()
    computerPaddle.reset()

}

document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
})


  const handleKeyDown = (e) => {
      controller1[e.keyCode] && (controller1[e.keyCode].pressed = true)
      console.log("ture");
  }

  const handleKeyUp = (e) => {
      controller1[e.keyCode] && (controller1[e.keyCode].pressed = false)
      console.log("false");
  }

  const controller1 = {
      87: {pressed: false, func: move1Up},
      83: {pressed: false, func: move1Down},
  }

  const runPressedButtons = () => {
      Object.keys(controller1).forEach(key => {
          controller1[key].pressed && controller1[key].func()
      })
  }


  document.addEventListener("keydown", handleKeyDown)
  document.addEventListener("keyup", handleKeyUp)


  function move1Up(){
      if (playerPaddle.position>=0){
          playerPaddle.position -= 0.5;
      }
  }

  function move1Down(){
      if (playerPaddle.position<=100) {
          playerPaddle.position += 0.5;
      }
  }





window.requestAnimationFrame(update)