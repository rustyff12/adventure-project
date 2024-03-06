const { Character } = require("./character");

class Enemy extends Character {
    constructor(
        name,
        description,
        currentRoom,
        cooldown = 3000,
        health = 100,
        strength = 10,
        attackTarget
    ) {
        super(name, description, currentRoom);
        this.health = health;
        this.strength = strength;
        this.cooldown = cooldown;
        this.attackTarget = null;
    }

    setPlayer(player) {
        this.player = player;
    }

    randomMove() {
        // bug here
        // console.log("Begining room: \n", this.currentRoom);
        // Possible room options
        let roomOpt = this.currentRoom.exits;

        let roomKeys = Object.keys(roomOpt);
        let randomNumLimit = roomKeys.length;
        // Generate a random index
        let randomIndex = Math.floor(Math.random() * randomNumLimit);

        // Get key (direction) that corresponds to random index
        let randomDirection = roomKeys[randomIndex];

        // Get room associated with the random direction
        let randomRoom = roomOpt[randomDirection];

        // Move enemy to random room
        this.currentRoom = randomRoom;
        // Incresase cooldown
        this.cooldown += 3000;
        // this.act();
    }

    takeSandwich() {
        // Fill this in
    }

    // Print the alert only if player is standing in the same room
    alert(message) {
        if (this.player && this.player.currentRoom === this.currentRoom) {
            console.log(message);
        }
    }

    rest() {
        // Wait until cooldown expires, then act
        const resetCooldown = function () {
            this.cooldown = 0;
            this.act();
        };
        setTimeout(resetCooldown.bind(this), this.cooldown);
    }

    attack() {
        if (this.attackTarget === null) {
            this.attackTarget = this.player;
        }

        this.attackTarget.applyDamage(this.strength);
        this.cooldown += 2000;
    }

    applyDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.die();
        } else {
            this.attackTarget = this.player;
            this.act();
        }
    }

    act() {
        if (this.health <= 0) {
            // Dead, do nothing;
        } else if (this.cooldown > 0) {
            this.rest();
        }
        if (this.attackTarget) {
            this.attack();
        } else {
            this.randomMove();
        }
        // this.scratchNose();
        // Fill this in
    }

    scratchNose() {
        this.cooldown += 1000;

        this.alert(`${this.name} scratches its nose`);
    }
}

module.exports = {
    Enemy,
};
// let enemy = new Enemy("enemy", "an ordinary character", "Test Room");
// console.log(enemy);
// enemy.randomMove();
