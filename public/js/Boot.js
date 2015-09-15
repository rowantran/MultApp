var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameCanvas');

var MultApp = {
    /* Store table variable created during RangeSelect */
    table: {}
}

MultApp.Boot = function (game) {
    this.music = null;
    this.playButton = null;
};

MultApp.Boot.prototype = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.state.start('Preload');
    }
}

game.state.add('Boot', MultApp.Boot);
