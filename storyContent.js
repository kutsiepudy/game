import { storyManager } from "./story.js";
import { startBattle } from "./battle.js";
import { playMusic, sfx } from "./audio.js";

export const SCENES = {
  intro: {
    setup: async () => {
      playMusic("assets/audio/intro.mp3");
    },
    dialogue: [
      "Welcome to Slime Hunter (dev)..."
    ],
    next: "room1"
  },

  room1: {
    setup: async() => {
      playMusic("assets/audio/overworld.mp3");
      document.body.style.backgroundImage = "url('assets/rooms/room1.png')"
      const enemy = document.getElementById("enemy");
      
      if (enemy) {
        enemy.style.display = "block";
        enemy.style.left = "200px";
        enemy.style.top = "400px";
      }

      const door = document.getElementById("doorToRoom2");
      if (door) door.style.display = "block";

      const door = document.getElementById("doorToRoom2");
      if (door) door.style.display = block;
    },
      dialogue: [
        "room 1",
        "testing rooms"
    ]
  },

  room2: {
    setup: async () => {
      playMusic("assets/audio/room2.mp3");
      document.body.style.backgroundImage = "url('assets/rooms/room2.png')";
      const enemy = document.getElementById("enemy");
      const npc = document.getElementById("sillyNPC");
      if (npc) {
        npc.style.display = "block";
        npc.style.left = "600px";
        npc.style.top = "300px";
      }
    },
    dialogue: [
      "room 2",
      "testing rooms"
    ]
  }
};
export default SCENES;
