export const gameState = {
  mode: "exploring",
  battlePhase: null,
  dialogueActive: false
};

export function setMode(newMode) {
  gameState.mode = newMode;
};

export function setPhase(phase) {
  gameState.phase = phase;
};

export function setDialogueActive(active) {
  gameState.dialogueActive = active
}
