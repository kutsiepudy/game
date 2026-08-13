export function createEnemy(type = "goblin") {
  const enemyTypes = {
    goblin: { health: 20, damage: 2, name: "Goblin" },
    guard: { health: 30, damage: 4, name: "Guard" },
    necromancer: { health: 60, damage: 10, name: "King"}
  };

 const config = enemyTypes[type] || enemyTypes.basic;

 return {
   name: config.name,
   health: config.health,
   maxHealth: config.health,
   damage: config.damage,

   takeDamage(amount) {
     this.health -= amount;
     if (this.health <= 0) this.health = 0;
   },

   reset() {
     this.health = this.maxHealth;
   }
 };
}

export let enemyStats = createEnemy("basic")
