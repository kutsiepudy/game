export const playerStats = {
  health: 27,
  spellPoints: 7,

  takeDamage(amount) {
    this.health -= amount;
    if (this.health < 0) this.health = 0;
  },

  heal(amount) {
    if (this.spellPoints <= 0) return false;
    this.health += amount;
    this.spellPoints -= 2;
    return true;
  }
};