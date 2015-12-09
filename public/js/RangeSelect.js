MultApp.RangeSelect = function() {
}

MultApp.RangeSelect.prototype = {
    create: function() {
        game.add.sprite(0, 0, 'bgGrass');

        var rangeSelectForm = '<select name="firstFrom" id="firstFrom"></select> - ' +
            '<select name="firstTo" id="firstTo"></select> &times; ' +
            '<select name="secondFrom" id="secondFrom"></select> - ' +
            '<select name="secondTo" id="secondTo"></select> <br>' +
            '<button type="button" id="submitRange">Submit</button>';
        
        $('#input').html(rangeSelectForm);

        rangeChoices = _.range(1, 21);
        optionsText = '';
        for (i = 0; i < rangeChoices.length; i++) {
            optionsText += '<option value="' + rangeChoices[i] + '">' + rangeChoices[i] + '</option>';
        }
        $('select').html(optionsText);

        var selectLabel = game.add.text(0, 80, 'Select range to multiply below', {font: '40px Open Sans', fill: '#000'});
        selectLabel.x = (game.world.width - selectLabel.width) / 2

        $('#submitRange').click(this.rangeSelectSubmit);
    },

    rangeSelectSubmit: function() {
        var firstFrom = $('#firstFrom').val();
        var firstTo = $('#firstTo').val();
        var firstOrdered = [parseInt(firstFrom), parseInt(firstTo)].sort();
        var firstRange = _.range(firstOrdered[0], firstOrdered[1]+1);
        
        var secondFrom = $('#secondFrom').val();
        var secondTo = $('#secondTo').val();
        var secondOrdered = [parseInt(secondFrom), parseInt(secondTo)].sort();
        var secondRange = _.range(secondOrdered[0], secondOrdered[1]+1);
        
        MultApp.table = multTable(firstRange, secondRange);
        
        game.state.start('Fight');
    }
}

game.state.add('RangeSelect', MultApp.RangeSelect);
