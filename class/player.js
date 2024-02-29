const { Food } = require("./food");

class Player {
    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
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
        console.log(this.items);
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
        const roomItem = this.currentRoom.items;
        for (let i = 0; i < roomItem.length; i++) {
            const element = roomItem[i].name;
            if (itemName === element) {
                // Takes a single object and puts it into  a new array
                const itemToTake = roomItem.splice(i, 1);
                // Push the contents of the new arr. ie. object
                this.items.push(itemToTake[0]);
                return;
            }
        }
    }

    dropItem(itemName) {
        const roomItems = this.currentRoom.items;
        for (let i = 0; i < this.items.length; i++) {
            const element = this.items[i].name;
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
                return;
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
}

module.exports = {
    Player,
};
// const newPlayer = new Player("Cloud", "test room");
// newPlayer.items.push("rock");
// // console.log(newPlayer.name);
// // console.log(newPlayer.currentRoom);
// newPlayer.printInventory();

//newPlayer.getItemByName();
