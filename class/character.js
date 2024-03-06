class Character {
    constructor(
        name,
        description,
        currentRoom,
        items = [],
        health = 100,
        strength = 10
    ) {
        this.name = name;
        this.description = description;
        this.currentRoom = currentRoom;
        this.items = items;
        this.health = health;
        this.strength = strength;
    }

    applyDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.die();
        }
    }

    dropAllItems() {
        for (let i = 0; this.items.length > 0; i++) {
            let toDrop = this.items.splice(0, 1);
            // console.log(toDrop);
            this.currentRoom.items.push(toDrop[0]);
        }
    }

    die() {
        this.dropAllItems();
        console.log(`${this.name} has died!`);
        this.currentRoom = null;
    }
}

module.exports = {
    Character,
};
/* const newChar = new Character("Cloud", "main character", "test room");
newChar.items.push("rock");
console.log(newChar);
newChar.applyDamage(100);
newChar.die(); */
// console.log(currentRoom.items);
