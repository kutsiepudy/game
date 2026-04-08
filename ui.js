export function updatePlayerUI(hpDisplay, playerStats) {
  if (!hpDisplay) return;
  hpDisplay.textContent = `HP: ${playerStats.health}   SP: ${playerStats.spellPoints}`;
}

export function updateEnemyUI(enemyDisplay, enemyStats) {
  if (!enemyDisplay) return
  enemyDisplay.textContent = `Enemy HP: ${enemyStats.health}`;
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
  document.getElementById("overworld").style.display = 
    gameState === "exploring" ? "block" : "none";
  document.getElementById("battleUI").style.display =
    gameState === "inBattle" ? "block" : "none";
  document.getElementById("deathScreen").style.display =
    gameState === "gameOver" ? "block" : "none";
}