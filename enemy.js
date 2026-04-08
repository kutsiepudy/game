export const enemyStats = {
  health: 80,

  takeDamage(amount) {
    this.health -= amount;
    if (this.health < 0) this.health = 0;
  }
};