MultApp.Preload = function(game) {
}

MultApp.Preload.prototype = {
    preload: function() {
        /* Buttons */
        game.load.atlasJSONArray('menuButtonPlay', 'assets/img/menuButtonPlay.png', 'assets/img/menuButtonPlay.json');
        game.load.atlasJSONArray('menuButton', 'assets/img/menuButton.png', 'assets/img/menuButton.json');
        game.load.atlasJSONArray('fightButton', 'assets/img/fightButton.png', 'assets/img/fightButton.json');
        game.load.atlasJSONArray('shopButton', 'assets/img/shopButton.png', 'assets/img/shopButton.json');

        /* Monsters */
        game.load.image('monsterSlime', 'assets/img/monsters/slime.png');
        game.load.image('monsterStump', 'assets/img/monsters/stump.png');

        /* Others */
	game.load.image('coin', 'assets/img/coin.png');
    },

    create: function() {
        game.state.start('Splash');
    }
}

game.state.add('Preload', MultApp.Preload);
