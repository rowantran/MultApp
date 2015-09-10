var menuState = {
    create: function() {
        game.stage.backgroundColor = '#53fc86';
        
        var nameLabel = game.add.text(80, 80, 'Multiplication', {font: '50px Open Sans', fill: '#000'});
        nameLabel.x = (game.world.width - nameLabel.width) / 2
        
        var startLabel = game.add.text(80, game.world.height-80, 'Press ENTER to start',
                                       {font: '30px Open Sans', fill: '#000'});
        startLabel.x = (game.world.width - nameLabel.width) / 2

        var startKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        startKey.onDown.addOnce(this.start, this);
    },

    start: function() {
        game.state.start('play');
    }
}
