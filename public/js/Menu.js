MultApp.Menu = function(game) {
}

MultApp.Menu.prototype = {
    create: function() {
        $('#input').html('');
        
        this.header();
        this.fightButton();
        this.shopButton();
        showGold();
    },

    header: function() {
        var header = game.add.text(0, 60, 'Menu', {'font': 'bold 50px Open Sans'});
        header.x = (game.world.width - header.width) / 2;
    },
    
    fightButton: function() {
        var fightButton = game.add.button(0, 140, 'fightButton', undefined, undefined, undefined, 'fightButtonNormal', 'fightButtonPressed', undefined);
        fightButton.x = (game.world.width - fightButton.width) / 2;
        fightButton.onInputUp.addOnce(this.fightButtonPressed);
    },

    fightButtonPressed: function() {
        game.state.start('RangeSelect');
    },

    shopButton: function() {
        var shopButton = game.add.button(0, 180, 'shopButton', undefined, undefined, undefined, 'shopButtonNormal', 'shopButtonPressed', undefined);
        shopButton.x = (game.world.width - shopButton.width) / 2;
        shopButton.onInputUp.addOnce(this.shopButtonPressed);
    },

    shopButtonPressed: function() {
        game.state.start('Shop');
    }
}

game.state.add('Menu', MultApp.Menu);
