import { gameState } from "./state.js";

export function updatePlayerUI(hpDisplay, playerStats) {
  if (!hpDisplay) return;

  hpDisplay.textContent =
    `HP: ${playerStats.health}   SP: ${playerStats.spellPoints}`;
}

export function updateEnemyUI(enemyDisplay, enemyStats) {
  if (!enemyDisplay) return;

  enemyDisplay.textContent =
    `Enemy HP: ${enemyStats.health}`;
}

export function showMessage(msg) {
  const textBox = document.getElementById("text");

  const line = document.createElement("div");
  line.textContent = msg;

  textBox.appendChild(line);

  textBox.scrollTop = textBox.scrollHeight;
}

export function clearMessages() {
  const textBox = document.getElementById("text");
  textBox.innerHTML = "";
}

export function updateUI() {
  const overworld = document.getElementById("overworld");
  const battleUI = document.getElementById("battleUI");
  const deathScreen = document.getElementById("deathScreen");

  if (overworld) {
    overworld.style.display =
      gameState.mode === "exploring" ? "block" : "none";
  }

  if (battleUI) {
    battleUI.style.display =
      gameState.mode === "inBattle" ? "block" : "none";
  }

  if (deathScreen) {
    deathScreen.style.display =
      gameState.mode === "gameOver" ? "block" : "none";
  }
}
