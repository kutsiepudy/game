import { showMessage, clearMessages } from "./ui.js";
import { sfx } from "./audio.js";
import { gameState, setDialogueActive } from "./state.js";

const text = document.getElementById("text");

let onFinishCallback = null;
let currentDialogue = [];
let dialogueIndex = 0;

export function startDialogue(dialogueArray, onFinish) {
  if (gameState.dialogueActive) return;

  setDialogueActive(true);
  onFinishCallback = onFinish || null;

  text.style.display = "block";
  clearMessages();

  currentDialogue = dialogueArray;
  dialogueIndex = 0;

  nextLine();
}

export function nextLine() {
  if (!gameState.dialogueActive) return;

  if (dialogueIndex < currentDialogue.length) {
    clearMessages();
    showMessage(currentDialogue[dialogueIndex]);
    dialogueIndex++;
  } else {
    endDialogue();
  }
}

export function endDialogue() {
  setDialogueActive(false);

  currentDialogue = [];
  dialogueIndex = 0;

  clearMessages();
  text.style.display = "none";

  if (onFinishCallback) {
    const callback = onFinishCallback;
    onFinishCallback = null;
    callback();
  }
}

export function displayChoices(choices, onChoiceSelect) {
  const text = document.getElementById("text");

  text.innerHTML = "";

  choices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.addEventListener("click" () => {
      text.innerHTML = "";
      onChoiceSelect(choice.id);
    });
    text.appendChild(button);
  });
};

document.addEventListener("keydown", (e) => {
  if (!gameState.dialogueActive) return;

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
