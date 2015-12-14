var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameCanvas');

var MultApp = {
    /* Store table variable created during RangeSelect */
    username: null,
    table: [],
    tableFlattened: [],
    tableRandom: [],

    /* Save */
    save: {
        gold: 0,

        monsterActive: 'slime',
        monstersOwned: ['slime']
    }
}

MultApp.Boot = function (game) {
};

MultApp.Boot.prototype = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.setBoundsToWorld();

        game.state.start('Preload');
    }
}

game.state.add('Boot', MultApp.Boot);
