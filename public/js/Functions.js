var SERVER_IP = 'http://localhost:8080';

function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function multTable(firstRange, secondRange) {
    table = [];
    for (var i = 0; i < firstRange.length; i++) {
        row = [];
        rowNumber = firstRange[i];
        
        for (var j = 0; j < secondRange.length; j++) {
            colNumber = secondRange[j];
            row.push([rowNumber, colNumber, rowNumber*colNumber]);
        }
        
        table.push(row);
    }

    return table;
}

function showGold() {
    gold = String(MultApp.save.gold);
    var goldLabel = game.add.text(0, 550, gold, {font: '20px Open Sans', fill: '#000'});
    goldLabel.x = game.world.width - goldLabel.x - 50;
    
    var coinIcon = game.add.image(0, 540, 'coin');
    coinIcon.x = goldLabel.x - 40;
    
    return [goldLabel, coinIcon];
}

function menuButton() {
    var menuButton = game.add.button(0, 20, 'menuButton', undefined, undefined, undefined, 'menuButtonNormal', 'menuButtonPressed', undefined);
    menuButton.x = game.world.width - menuButton.width - 30;
    menuButton.onInputUp.addOnce(menuButtonPressed);
}

function menuButtonPressed() {
    game.state.start('Menu');
}

function userExists(username, callback) {
    var getUser = $.ajax({
        url: SERVER_IP + '/user/' + username + '/save',
        type: 'get',
        headers: {
            'Authorization': 'hmac blank'
        }
    });
    
    getUser.always(function() {
        callback(getUser.status != 404);
    });
}

function uploadSave(username, save) {
    $.ajax({
        url: SERVER_IP + '/user/' + username + '/save',
        type: 'post',
        data: save,
        headers: {
            'Authorization': 'hmac blank'
        },
        dataType: 'json'
    });
}

function loadSave() {
}
