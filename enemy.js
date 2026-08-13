export function enemyTypes(type = "basic") {
  const enemyClasses = {
    basic: { health: 20, damage: 2, name: "small" },
    strong: { health: 30, damage: 4, name: "big" },
    boss: { health: 60, damage: 10, name: "huge"}
  };

 const config = enemyTypes[types] || enemyClasse.basic;

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

export let enemyStats = creatEnemy("basic")
