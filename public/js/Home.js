MultApp.Home = function (game) {
}

MultApp.Home.prototype = {
    problem: function(index) {
	var goldLabels = MultApp.Home.prototype.showGold();
	var goldLabel = goldLabels[0];
	var coinIcon = goldLabels[1];
	
        problem = MultApp.tableRandom[index];
        firstFactor = problem[0];
        secondFactor = problem[1];
        product = problem[2];

        var problemLabel = game.add.text(0, 80, String(firstFactor) + 'X' + String(secondFactor), {font: '40px Open Sans', fill: '#000'});
        problemLabel.x = (game.world.width - problemLabel.width) / 2;

	var answerInputRaw = '<form id="answerForm" onSubmit="return false;">' +
	    '<input type="text" id="answer" name="answer">' +
	    '</input>' +
	    '</form>';
	
        $('#input').html(answerInputRaw);
	$('#answer').focus();
        $('#answerForm').submit(function(event) {
	    if (MultApp.Home.prototype.checkAnswer(index, $('#answer').val())) {
		MultApp.gold += 5;
	    }
	    
            if (index+1 < MultApp.tableRandom.length) {
                problemLabel.destroy();
		goldLabel.destroy();
		coinIcon.destroy();
                MultApp.Home.prototype.problem(index+1);
            }
        });
    },

    showGold: function() {
	gold = String(MultApp.gold);
	var goldLabel = game.add.text(0, 550, gold, {font: '20px Open Sans', fill: '#000'});
	goldLabel.x = game.world.width - goldLabel.x - 50;

	var coinIcon = game.add.image(0, 540, 'coin');
	coinIcon.x = goldLabel.x - 40;

	return [goldLabel, coinIcon];
    },

    checkAnswer: function(index, answer) {
	problem = MultApp.tableRandom[index];
        product = problem[2];

	return (product == answer);
    },
    
    create: function() {
        for (i = 0; i < MultApp.table.length; i++) {
            for (j = 0; j < MultApp.table[0].length; j++) {
                MultApp.tableFlattened.push(MultApp.table[i][j]);
            }
        }
        MultApp.tableRandom = _.shuffle(MultApp.tableFlattened);

        $('#input').html('');

        MultApp.Home.prototype.problem(0);
    }
}

game.state.add('Home', MultApp.Home);
