import { gameState } from "./state.js";
import { startBattle } from "./battle.js";
import { storyManager } from "./story.js"; 

export function setupMovement(player, enemy) {

  function handleDoorCollision() {
    const doors = document.querySelectorAll(".door");
    doors.forEach((door) => {
      if (!door || door.style.display === "none") return;
      if (checkCollision(player, door)) {
        const target = door.dataset.target;
        if (target && !gameState.dialogueActive) {
          storyManager.playScene(target);
        }
      }
    });
  }

  function gameLoop() {
    if (canMove()) {
      handleMovement();
      handleCollision();
      handleNPCCollision(); 
      handleDoorCollision(); 
    }

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
}

function checkCollision(player, other) {
  if (!other || other.style.display === "none") return false;
  if (gameState.mode !== "exploring") return false;

  const playerRect = player.getBoundingClientRect();
  const otherRect = other.getBoundingClientRect();

  return !(
    playerRect.right < otherRect.left ||
    playerRect.left > otherRect.right ||
    playerRect.bottom < otherRect.top ||
    playerRect.top > otherRect.bottom
  );
}
