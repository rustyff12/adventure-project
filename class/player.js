const { Character } = require("./character");
const { Enemy } = require("./enemy");
const { Food } = require("./food");
const { Room } = require("./room");
const { DarkRoom } = require("./darkRoom");
const { Light } = require("./light");
class Player extends Character {
    constructor(name, startingRoom) {
        super(name, "main character", startingRoom);
        this.items = [];
    }

    move(direction) {
        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0; i < this.items.length; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        // List of items in room
        const roomItem = this.currentRoom.items;
        for (let i = 0; i < roomItem.length; i++) {
            const element = roomItem[i].name;
            if (itemName === element) {
                // Takes item and puts into new array
                const itemToTake = roomItem.splice(i, 1);
                // Push the contents of new array to items
                this.items.push(itemToTake[0]);
                return;
            }
        }
    }

    dropItem(itemName) {
        // list of items in room
        const roomItems = this.currentRoom.items;
        for (let i = 0; i < this.items.length; i++) {
            const element = this.items[i].name;
            // if element matches, push to room items
            if (element === itemName) {
                const itemToDrop = this.items.splice(i, 1);
                roomItems.push(itemToDrop[0]);
                return;
            }
        }
    }

    eatItem(itemName) {
        for (let i = 0; i < this.items.length; i++) {
            const element = this.items[i].name;
            if (element === itemName && this.items[i] instanceof Food) {
                const foodToTake = this.items.splice(i, 1);
            }
        }
    }

    getItemByName(name) {
        for (let i = 0; i < this.items.length; i++) {
            const element = this.items[i].name;
            if (element === name) {
                return this.items[i];
            }
        }
    }

    hit(name) {
        let enemy = this.currentRoom.getEnemyByName(name);
        // console.log(enemy);

        if (enemy) {
            enemy.attackTarget = this;
        }
    }

    die() {
        console.log("You are dead!");
        process.exit();
    }

    hasLight() {
        return this.items.some((item) => item.name === "light");
    }

    useLight() {
        if (this.hasLight()) {
            if (this.currentRoom instanceof DarkRoom) {
                // Toggle the light state
                this.currentRoom.setLightPresent(true);

                // Output a message indicating the light state change
                if (this.currentRoom.lightPresent) {
                    console.log("You turn on the light.\n");
                } else {
                    console.log("You turn off the light.\n");
                }
            } else {
                console.log(
                    "You are not in a dark room, you don't need to use the light."
                );
            }
        } else {
            console.log("You don't have a light to use.");
        }
    }
}

module.exports = {
    Player,
};

/* const darkRoom = new DarkRoom("dark room", "just a test");
const newChar = new Character("Cloud", "A merc", darkRoom);
const newPlayer = new Player(newChar, darkRoom);
const light = new Light("light", "test light");
newPlayer.items.push(light);
// console.log(newPlayer.name);
console.log(newPlayer.items);
console.log(newPlayer.hasLight());
newPlayer.useLight(); */
/* console.log(darkRoom.name);
console.log(darkRoom.description); */

/*
useLight() {
        if (this.hasLight()) {
            if (this.currentRoom instanceof DarkRoom) {
                this.currentRoom.setLightPresent(
                    !this.currentRoom.lightPresent
                );
                if (this.currentRoom.lightPresent) {
                    console.log("You turn on the light.\n");
                } else {
                    console.log("You turn off the light.\n");
                }
            } else {
                console.log(
                    "You are not in a dark room, you don't need to use the light."
                );
            }
        } else {
            console.log("You don't have a light to use.");
        }
    }
*/
