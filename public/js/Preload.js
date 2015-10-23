MultApp.Preload = function(game) {
}

MultApp.Preload.prototype = {
    preload: function() {
        game.load.atlasJSONArray('menuButtonPlay', 'assets/img/menuButtonPlay.png', 'assets/img/menuButtonPlay.json');
	game.load.image('coin', 'assets/img/coin.png');
    },

    create: function() {
        game.state.start('Menu');
    }
}

game.state.add('Preload', MultApp.Preload);
