import { playerStats } from "./player.js";
import { createEnemy } from "./enemy.js";
import { updatePlayerUI, updateEnemyUI, clearMessages, updateUI } from "./ui.js";
import { playMusic, sfx, stopMusic } from "./audio.js";
import { startDialogue } from "./dialogue.js";
import { gameState, setMode, setPhase } from "./state.js";

let enemyStats;

export function startBattle(enemyType = "goblin") {
  enemyStats = createEnemy(enemyType);
  enemyStats.reset();
  
  setMode("inBattle");
  setPhase("intro");

  updateUI();
  clearMessages();

  sfx("assets/audio/battleStart.mp3");
  playMusic("assets/audio/battleMusic.mp3");

  document.getElementById("battleUI").style.display = "block";

  startDialogue([
    `A wild ${enemyStats.name} appears`,
    "Battle started..."
  ], () => {
    setPhase("playerTurn");
  });
}

export function enemyTurn(hpDisplay) {
  if (
    gameState.mode !== "inBattle" ||
    gameState.phase !== "enemyTurn"
  ) return;

  playerStats.takeDamage(enemyStats.damage);

  if (playerStats.health <= 0) {
    setMode("gameOver");
    setPhase(null);

    updateUI();
    clearMessages();

    stopMusic();
    playMusic("assets/audio/gameOver.mp3");

    startDialogue([
      "Tough Luck..."
    ]);

    return;
  }

  updatePlayerUI(hpDisplay, playerStats);

  setPhase("playerTurn");
}

export function playerAttack(hpDisplay, enemyDisplay) {
  if (
    gameState.mode !== "inBattle" ||
    gameState.phase !== "playerTurn"
  ) return;

  enemyStats.takeDamage(4);

  updateEnemyUI(enemyDisplay, enemyStats);

  if (enemyStats.health <= 0) {
    endBattle();
    return;
  }

  // enemy's turn now
  setPhase("enemyTurn");

  setTimeout(() => {
    enemyTurn(hpDisplay);
  }, 800);
}

export function playerHeal(hpDisplay) {
  if (
    gameState.mode !== "inBattle" ||
    gameState.phase !== "playerTurn"
  ) return;

  const healed = playerStats.heal(4);

  if (!healed) {
    sfx("assets/audio/error.mp3");
    return;
  }

  updatePlayerUI(hpDisplay, playerStats);
  
  setPhase("enemyTurn");

  setTimeout(() => {
    enemyTurn(hpDisplay);
  }, 800);
}

export function endBattle() {
  if (gameState.mode !== "inBattle") return;

  clearMessages();

  startDialogue([
    "You won!"
  ], () => {
    stopMusic();
    playMusic("assets/audio/overworld.mp3");

    setMode("exploring");
    setPhase(null);

    updateUI();

    document.getElementById("enemy").style.display = "none";
    document.getElementById("battleUI").style.display = "none";
  });
}
