// Light that inherits from Item
const { Item } = require("./item");
class Light extends Item {
    constructor(name, description) {
        super(name, description);
    }
}

module.exports = {
    Light,
};
