const { expect } = require("chai");

const { Player } = require("../class/player.js");
const { Room } = require("../class/room.js");
const { Item } = require("../class/item.js");
const { Food } = require("../class/food.js");
const { World } = require("../class/world");
const { DarkRoom } = require("../class/darkRoom.js");
const { Light } = require("../class/light.js");

const worldData = require("../data/world-data");

describe("Light", function () {
    let newLight;
    let room;
    let player;
    let darkPlayer;
    let newDarkRoom;
    beforeEach(() => {
        newLight = new Light("light", "just a test light");
        room = new Room("Test Room", "A test room");
        player = new Player("player", room);
        darkPlayer = new Player("darkPlayer", newDarkRoom);
        newDarkRoom = new DarkRoom("test dark room", "a test dark room");
    });

    it("Should have name and description attributes", () => {
        expect(newLight.name).to.equal("light");
        expect(newLight.description).to.equal("just a test light");
    });

    it("Can be retrieved from player inventory by name", () => {
        player.items.push(newLight);
        expect(player.items.length).to.equal(1);
        expect(player.getItemByName("light")).to.equal(newLight);
    });

    it("Can be retrieved from a room by name", () => {
        room.items.push(newLight);
        expect(room.items.length).to.equal(1);

        expect(room.getItemByName("light")).to.equal(newLight);
    });

    it("Player has light", () => {
        player.items.push(newLight);

        expect(player.hasLight()).to.be.true;
    });
});

describe("Dark Room", function () {
    let newDarkRoom;
    let room;
    let light;
    let player;
    beforeEach(() => {
        room = new Room("test room", "just a test room");
        newDarkRoom = new DarkRoom("test dark room", "a test dark room");
        light = new Light("test light", "a text light");
        player = new Player("player", newDarkRoom);
    });

    it("Should have name and description attributes", () => {
        expect(newDarkRoom.name).to.equal("test dark room");
        expect(newDarkRoom.description).to.equal("a test dark room");
    });

    it("Should be an instance of DarkRoom and Room", () => {
        expect(room instanceof Room).to.be.true;
        expect(room instanceof DarkRoom).to.be.false;

        expect(newDarkRoom instanceof Room).to.be.true;
        expect(newDarkRoom instanceof DarkRoom).to.be.true;
    });
});

describe("Light methods", () => {
    let newDarkRoom;
    let room;
    let light;
    let player;
    beforeEach(() => {
        room = new Room("test room", "just a test room");
        newDarkRoom = new DarkRoom("test dark room", "a test dark room");
        light = new Light("light", "a test light");
        player = new Player("player", newDarkRoom);
    });

    it("Should toggle the light presence in the dark room", () => {
        player.items.push(light);

        // Toggle light presence
        player.useLight();

        // Assert
        expect(newDarkRoom.lightPresent).to.be.true;
    });
});
