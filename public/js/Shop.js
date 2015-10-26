MultApp.Shop = function(game) {
}

MultApp.Shop.prototype = {
    create: function() {
        $('#input').html('');

        menuButton();
        
        var goldLabels = showGold();
        var goldLabel = goldLabels[0];
        var coinIcon = goldLabels[1];

        this.renderMonsterListing(0, 60);
    },

    renderMonsterListing: function(key, y) {
        var monster = monsters[Object.keys(monsters)[key]];

        console.log(key);
        var monsterName = capitalizeFirstLetter(Object.keys(monsters)[key]);
        var cost = monster['cost'];

        var coinIcon = game.add.image(50, y, 'coin');
        var costLabel = game.add.text(85, y, String(cost), {font: '30px Open Sans'});
        var nameLabel = game.add.text(costLabel.x + costLabel.width + 20, y, monsterName);

        if (key+1 < _.size(monsters)) {
            console.log("Going to next iteration");
            this.renderMonsterListing(key+1, y+50);
        }
    }
}

game.state.add('Shop', MultApp.Shop);
