import { playerStats } from "./player.js";
import { enemyStats } from "./enemy.js";
import { updatePlayerUI, updateEnemyUI, showMessage, clearMessages, updateUI} from "./ui.js";
import {playMusic, sfx, stopMusic} from "./audio.js";

let gameState = "exploring"

export function getGameState() {
  return gameState;
};

export function startBattle() {
  gameState = "inBattle";
  updateUI();
  clearMessages();
  showMessage("A battle begins.");
  sfx("assets/audio/battleStart.mp3");
  playMusic("assets/audio/battleMusic.mp3")
  document.getElementById("battleUI").style.display = "block";
}

export function enemyTurn(hpDisplay) {
  if (getGameState() !== "inBattle") return;

  playerStats.takeDamage(2);

  if (playerStats.health <= 0) {
    gameState = "gameOver";
    updateUI();
    clearMessages();
    showMessage("Tough Luck...");
    stopMusic();
    playMusic("assets/audio/gameOver.mp3");
    return;
  }

  updatePlayerUI(hpDisplay, playerStats);
}

export function playerAttack(hpDisplay, enemyDisplay) {
  if (getGameState() !== "inBattle") return;

  enemyStats.takeDamage(4);

  if (enemyStats.health <= 0) {
    endBattle();
    return
  }

  updateEnemyUI(enemyDisplay, enemyStats);
  setTimeout(() => {
    enemyTurn(hpDisplay);
  }, 800);
}

export function endBattle() {
  if (getGameState() !== "inBattle") return;

  clearMessages();
  showMessage("You won!");
  stopMusic();
  playMusic("assets/audio/victory.mp3");

  gameState = "exploring";
  updateUI();

  document.getElementById("enemy").style.display = "none";
  document.getElementById("battleUI").style.display = "none";
}

export function playerHeal(hpDisplay) {
  if (getGameState() !== "inBattle") return;

  const healed = playerStats.heal(4);
  if (!healed) {
    sfx("assets/audio/error.mp3");
    return;
  }

  updatePlayerUI(hpDisplay, playerStats);
  enemyTurn(hpDisplay);
}
