import { playerStats } from "./player.js";
import { enemyStats } from "./enemy.js";
import { updatePlayerUI, updateEnemyUI, clearMessages, updateUI} from "./ui.js";
import {playMusic, sfx, stopMusic} from "./audio.js";
import {startDialogue} from "./dialogue.js";
import {gameState, setMode, setPhase} from "./state.js";

export function startBattle() {
  setMode("inBattle");
  setPhase("intro")
  updateUI();
  clearMessages();
  sfx("assets/audio/battleStart.mp3");
  playMusic("assets/audio/battleMusic.mp3");
  document.getElementById("battleUI").style.display = "block";

  startDialogue([
    "A wild Lancer appears",
    "Battle started..."
  ], () => {
    setPhase("playerTurn");
  });
}

export function enemyTurn(hpDisplay) {
  if (gameState.mode !== "inBattle") return;

  playerStats.takeDamage(2);

  if (playerStats.health <= 0) {
    setMode("gameOver");
    setPhase(null);
    updateUI();
    clearMessages();
    startDialogue(["Tough Luck..."], () => {
      endDialogue();
    });
    stopMusic();
    playMusic("assets/audio/gameOver.mp3");
    return;
  }

  updatePlayerUI(hpDisplay, playerStats);
}

export function playerAttack(hpDisplay, enemyDisplay) {
  if (gameState.mode !== "inBattle") return;

  enemyStats.takeDamage(4);

  if (enemyStats.health <= 0) {
    endBattle();
    return;
  }

  updateEnemyUI(enemyDisplay, enemyStats);
  setTimeout(() => {
    enemyTurn(hpDisplay);
  }, 800);
}

export function endBattle() {
  if (gameState.mode !== "inBattle") return;

  clearMessages();
  startDialogue(["You won!"], () => {
    setMode("exploring");
    setPhase(null)
    stopMusic();
    playMusic("overworld.mp3")
    updateUI();
  
    document.getElementById("enemy").style.display = "none";
    document.getElementById("battleUI").style.display = "none";
  });
}

export function playerHeal(hpDisplay) {
  if (gameState.mode !== "inBattle") return;

  const healed = playerStats.heal(4);
  if (!healed) {
    sfx("assets/audio/error.mp3");
    return;
  }

  updatePlayerUI(hpDisplay, playerStats);
  enemyTurn(hpDisplay);
}
