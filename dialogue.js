import { showMessage, clearMessages } from "./ui.js";
import { sfx } from "./audio.js";

const text = document.getElementById("text");
let onFinishCallback = null;

let currentDialogue = [];
let dialogueIndex = 0;
let dialogueActive = false;

export function startDialogue(dialogueArray) {
  dialogueActive = true;
  onFinishCallback = onFinish || null;

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
  } else {
    endDialogue();
  }
}

export function endDialogue() {
  dialogueActive = false;
  currentDialogue = [];
  dialogueIndex = 0;

  clearMessages();
  text.style.display = "none";

  if (onFinishCallback) {
    onFinishCallback();
    onFinishCallback = null;
  }
}

export function isDialogueActive() {
  return dialogueActive;
}

document.addEventListener("keydown", (e) => {
  if (!dialogueActive) return;

  if (e.key === "Z" || e.key === "z") {
    sfx("assets/misc/input.mp3");
    nextLine();
  }
});

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
};
