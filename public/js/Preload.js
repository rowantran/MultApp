MultApp.Preload = function(game) {
}

MultApp.Preload.prototype = {
    preload: function() {
        /* Buttons */
        game.load.atlasJSONArray('menuButtonPlay', 'assets/img/menuButtonPlay.png', 'assets/img/menuButtonPlay.json');
        game.load.atlasJSONArray('menuButton', 'assets/img/menuButton.png', 'assets/img/menuButton.json');
        game.load.atlasJSONArray('fightButton', 'assets/img/fightButton.png', 'assets/img/fightButton.json');
        game.load.atlasJSONArray('shopButton', 'assets/img/shopButton.png', 'assets/img/shopButton.json');
        game.load.atlasJSONArray('buyButton', 'assets/img/buyButton.png', 'assets/img/buyButton.json');
        game.load.atlasJSONArray('selectButton', 'assets/img/selectButton.png', 'assets/img/selectButton.json');

        /* Backgrounds */
        game.load.image('bgBase', 'assets/img/bg/base.png');
        game.load.image('bgGrass', 'assets/img/bg/grass.png');
        
        /* Monsters */
        game.load.image('monsterSlime', 'assets/img/monsters/slime.png');
        game.load.image('monsterStump', 'assets/img/monsters/stump.png');
        game.load.image('monsterPig', 'assets/img/monsters/pig.png');
        game.load.image('monsterMushroom', 'assets/img/monsters/mushroom.png');

        /* Others */
	game.load.image('coin', 'assets/img/coin.png');
        game.load.image('monsterOwned', 'assets/img/owned.png');
        game.load.image('monsterNotOwned', 'assets/img/notOwned.png');
        game.load.image('monsterSelected', 'assets/img/monsterSelected.png');
    },

    create: function() {
        game.state.start('Login');
    }
}

game.state.add('Preload', MultApp.Preload);
