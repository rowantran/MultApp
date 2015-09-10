var loadState = {
    preload: function() {
        var splash = game.add.text(80, 150, 'Loading...', {font: 'bold 30px Open Sans', fill: '#ffffff'});
    },

    create: function() {
        game.state.start('menu');
    }
}
