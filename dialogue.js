import {showMessage, clearMessages} from "./ui.js"
import {sfx} from "./audio.js"

let currentDialogue = []
let dialogueIndex = 0
let dialogueActive = true;

export function startDialogue(dialogueArray) {
  text.style.display = "block";
  clearMessages();
  currentDialogue = dialogueArray;
  dialogueIndex = 0;
  nextLine();
}

export function nextLine() {
  if (!dialogueActive) return;

  if (dialogueIndex < currentDialogue.length) {
    clearMessages();
    showMessage(currentDialogue[dialogueIndex]);
    dialogueIndex++;
  }
}

export function endDialogue() {
  text.style.display = "none";
  clearMessages();
  dialogueActive = false;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Z" || e.key === "z") {
    sfx("assets/misc/input.mp3")
    nextLine();
  }
})
export const dialogues = {
  sillyNPC: [
    "PEE PEE",
    "POO POO",
    "Hey guys my name is markiplier."
  ],

  angryNPC: [
    "I'M ANGRY",
    "GRRRRRRRRRR",
    "I'm happy",
    "YOU MADE ME MAD",
    "I WOULD LIKE TO RAGE!"
  ]
}