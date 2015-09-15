MultApp.Preload = function(game) {
}

MultApp.Preload.prototype = {
    create: function() {
        game.load.image('menuButtonPlay', 'assets/img/menuButtonPlay.png');
    }
}

game.state.add('Preload', MultApp.Preload);
