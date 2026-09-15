import { storyManager } from "./story.js";
import { startBattle } from "./battle.js";
import { playMusic, sfx } from "./audio.js";

export const SCENES = {
  intro: {
    setup: async () => {
      playMusic("assets/audio/intro.mp3");
    },
    dialogue: [
      "Welcome to Slime Hunter (dev)...",
      "You wake up in a strange place.",
      "What happened?"
    ]
  }
};
export default SCENES;
