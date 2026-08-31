export class StoryManager {
  constructor() {
    this.currentCutscene = "intro";
    this.sceneHistory = [];
    this.flags = {};
    this.variables = {};
    this.inventory = []
  }

  getScene(sceneID) {
    return SCENES[sceneID] || null;
  }

  goToScene(sceneID) {
    this.sceneHistory.push(this.currentScene);
    this.currentScene = sceneID;
    return this.getScene(sceneID);
  }

  setFlag(flag, value = true) {
    this.flags[flag] = value;
  }

  hasFlag(flag) {
    return this.flags[flag] === true;
  }

  getVariable(key) {
    return this.variable[key] || 0;
  }

  async playScene(sceneID) {
    const scene = this.getScene(sceneID);
    
    if (!scene) return;

    if (scene.setup) await scene.setup();

    if (scene.dialogue) {
      await this.showChoices(scene.choices);
    }

    if (scene.next) {
      this.goToScene(scene.next);
    }
  }

  playDialogue(dialogueArray) {
    return new Promise((resolve) => {
      startDialogue(dialogueArray, resolve);
    });
  }

  showChoices(choices) {
    return new Promise((resolve) => {
      displayChoices(choices, (choiceId) => {
        const choice = choices.find(c => c.id === choiceId);
        
        if (choice.onSelect) choice.onSelect();
        
        if (choice.next) {
          this.goToScene(choice.next);
        }
        
        resolve(choiceId);
      });
    });
  }
}

export const storyManager = new StoryManager();
