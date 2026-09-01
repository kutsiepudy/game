import { storyManager } from "./story.js";
import { startBattle } from "./battle.js";
import { playMusic, sfx } from "./audio.js";

export const SCENES = {
  intro: {
    setup: async () => {
      playMusic("assets/audio/intro.mp3");
    },
    dialogue: [
      "Welcome to [GAME NAME]...",
      "You wake up in a strange place.",
      "What happened?"
    ],
    next: "overworld_start"
  },

  overworld_start: {
    setup: async () => {
      playMusic("assets/audio/overworld.mp3");
      storyManager.setFlag("explored_world");
    },
    dialogue: [
      "You find yourself in the overworld.",
      "There are NPCs around...",
      "What will you do?"
    ],
    choices: [
      {
        id: "talk_npc_1",
        text: "Talk to the silly NPC",
        onSelect: () => {
          storyManager.addVariable("npc_interactions", 1);
        },
        next: "silly_npc_chat"
      },
      {
        id: "talk_npc_2",
        text: "Talk to the angry NPC",
        onSelect: () => {
          storyManager.setFlag("talked_to_angry_npc");
        },
        next: "angry_npc_chat"
      },
      {
        id: "explore",
        text: "Explore further",
        next: "forest_entrance"
      }
    ]
  },

  silly_npc_chat: {
    dialogue: [
      "PEE PEE POO POO!",
      "Hey guys, my name is Markiplier.",
      "Want to fight?"
    ],
    choices: [
      {
        id: "fight_silly",
        text: "Challenge to battle!",
        onSelect: () => {
          startBattle("goblin");
        },
        next: "post_silly_battle"
      },
      {
        id: "skip_silly",
        text: "Leave them alone",
        next: "overworld_start"
      }
    ]
  },

  post_silly_battle: {
    dialogue: [
      "You won the battle!",
      "The silly NPC looks defeated...",
      "You continue your journey."
    ],
    next: "overworld_start"
  },

  angry_npc_chat: {
    dialogue: [
      "I'M ANGRY!",
      "GRRRRRR!",
      "You made me mad!",
      "I would like to RAGE!"
    ],
    choices: [
      {
        id: "fight_angry",
        text: "Battle them!",
        onSelect: () => {
          startBattle("guard");
        },
        next: "post_angry_battle"
      },
      {
        id: "calm_angry",
        text: "Try to calm them down",
        onSelect: () => {
          storyManager.setFlag("calmed_angry_npc");
          storyManager.addPartyMember("angry_npc");
        },
        next: "angry_npc_joined"
      }
    ]
  },

  angry_npc_joined: {
    dialogue: [
      "The angry NPC has joined your party!",
      "Together, you continue forward..."
    ],
    next: "overworld_start"
  },

  post_angry_battle: {
    dialogue: [
      "You defeated the angry NPC!",
      "They seem to respect you now..."
    ],
    next: "overworld_start"
  },

  forest_entrance: {
    dialogue: [
      "You venture into the dark forest...",
      "Suddenly, a powerful enemy appears!"
    ],
    setup: async () => {
      storyManager.setFlag("entered_forest");
    },
    choices: [
      {
        id: "fight_boss",
        text: "Face the enemy!",
        onSelect: () => {
          startBattle("necromancer");
        },
        next: "boss_defeated"
      },
      {
        id: "retreat",
        text: "Retreat",
        next: "overworld_start"
      }
    ]
  },

  boss_defeated: {
    dialogue: [
      "You defeated the King!",
      "The curse has been lifted!",
      "The world is saved... for now."
    ],
    setup: async () => {
      storyManager.setFlag("defeated_boss");
    },
    next: "ending"
  },

  ending: {
    dialogue: [
      "Thanks for playing!",
      "Your adventure awaits..."
    ]
  }
};
export default SCENES;
