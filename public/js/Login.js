MultApp.Login = function(game) {
}

MultApp.Login.prototype = {
    create: function() {
        game.add.sprite(0, 0, 'bgBase');
        
        var loginLabel = game.add.text(0, 80, 'Enter username:', {font: '50px Open Sans', fill: '#000'});
        loginLabel.x = (game.world.width - loginLabel.width) / 2;

        var usernameForm = '<input type="text" name="username" id="username"></input>' +
            '<button type="button" id="submitUsername">Log in</button>';
        $('#input').html(usernameForm);

        $('#submitUsername').click(this.login);
    },

    login: function() {
        var username = $('#username').val();
        userExists(username, function(exists) {
            if (exists) {
                MultApp.save = loadSave(username);
            }
            MultApp.username = username;
            game.state.start('Splash');
        });
    }
}

game.state.add('Login', MultApp.Login);
