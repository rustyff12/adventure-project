// Dark Room
// Iherits from room
// Create a DarkRoom that inherits from Room and a Light that inherits from Item. Dark rooms show only a description of "You cannot see anything" unless a light is in the room or being held.
const { Player } = require("./player");
const { Room } = require("./room");

class DarkRoom extends Room {
    constructor(name, description) {
        super(name, description);
        this.lightPresent = false;
    }

    printRoom(player) {
        console.clear();
        console.log("");
        console.log(this.name);
        console.log("");
        if (this.lightPresent || (player && player.hasLight())) {
            console.log(this.description);
            if (this.getEnemies().length > 0) {
                console.log(
                    `Enemies: ${this.getEnemies()
                        .map((enemy) => enemy.name)
                        .join(", ")}`
                );
            }
            if (this.items.length > 0) {
                console.log(
                    `Items: ${this.items.map((item) => item.name).join(", ")}`
                );
            }
            console.log(this.getExitsString());
        } else {
            console.log("You cannot see anything.");
        }
        console.log("");
    }

    setLightPresent(value) {
        this.lightPresent = value;
    }
}

module.exports = {
    DarkRoom,
};
