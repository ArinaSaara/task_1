class Fighter {
    constructor({name, health, attack, defense, source}) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.source = source;
    }

    getHitPower() {
        const criticalHitChance = 1 + Math.floor(Math.random() * 2);
        const power = this.attack * criticalHitChance;

        return power;
    }

    getBlockPower() {
        const dodgeChance = 1 + Math.floor(Math.random() * 2);
        const power = this.defense * dodgeChance;

        return power;
    }
}

export default Fighter;