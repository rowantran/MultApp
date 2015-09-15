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
