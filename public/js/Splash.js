MultApp.Splash = function(game) {
    this.startButton = null;
}

MultApp.Splash.prototype = {
    create: function() {
        game.add.sprite(0, 0, 'bgSplash');
        
        var nameLabel = game.add.text(0, 80, 'Multiplication', {font: '50px Open Sans', fill: '#000'});
        nameLabel.x = (game.world.width - nameLabel.width) / 2;

        this.startButton = game.add.button(0, game.world.height-80, 'menuButtonPlay', undefined, undefined, undefined, 'menuButtonPlayNormal.png', 'menuButtonPlayPressed.png', undefined);
        this.startButton.x = (game.world.width - this.startButton.width) / 2;
        this.startButton.onInputUp.addOnce(this.up, this);
    },

    up: function() {
        game.state.start('RangeSelect');
    },

    update: function() {
        game.add.sprite('bgSplash', 0, 0);
    }
}

game.state.add('Splash', MultApp.Splash);
