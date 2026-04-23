import {gameState, startBattle} from "./battle.js";

export function setupMovement(player, enemy) {
  let playerX = 100;
  let playerY = 100;
  let currentSpeed = keys["x"] ? speed * 2;
  const speed = 3;

  const keys = {};

  document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
  });

  document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });

  function gameLoop() {
    if (gameState !== "inBattle") {
      if (keys["ArrowUp"]) playerY -= speed;
      if (keys["ArrowDown"]) playerY += speed;
      if (keys["ArrowLeft"]) playerX -= speed;
      if (keys["ArrowRight"]) playerX += speed;
      if (keys["x"]) currentSpeed


      playerX = Math.max(0, Math.min(window.innerWidth - 50, playerX));
      playerY = Math.max(0, Math.min(window.innerHeight - 50, playerY));

      player.style.left = playerX + "px";
      player.style.top = playerY + "px";
      if (checkCollision(player, enemy)) {
        startBattle();
        return;
      }
    }

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
}

function checkCollision(player, enemy) {
  const playerRect = player.getBoundingClientRect();
  const enemyRect = enemy.getBoundingClientRect();

  return !(
    playerRect.right < enemyRect.left ||
    playerRect.left > enemyRect.right ||
    playerRect.bottom < enemyRect.top ||
    playerRect.top > enemyRect.bottom
  );
}
