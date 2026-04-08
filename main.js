import { playerStats } from "./player.js";
import { enemyStats } from "./enemy.js";
import { updatePlayerUI, updateEnemyUI } from "./ui.js";
import { playerAttack, playerHeal } from "./battle.js";
import { setupMovement } from "./movement.js";

const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const hpDisplay = document.getElementById("playerHealth");
const enemyHPDisplay = document.getElementById("enemyHealth");

const dmgButton = document.getElementById("damage");
const hpButton = document.getElementById("heal");

updatePlayerUI(hpDisplay, playerStats);
updateEnemyUI(enemyHPDisplay, enemyStats);

setupMovement(player, enemy);

dmgButton.addEventListener("click", () => {
  playerAttack(hpDisplay, enemyHPDisplay);
});

hpButton.addEventListener("click", () => {
  playerHeal(hpDisplay);
});
