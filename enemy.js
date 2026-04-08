export const enemyStats = {
  health: 19,

  takeDamage(amount) {
    this.health -= amount;
    if (this.health < 0) this.health = 0;
  }
};
