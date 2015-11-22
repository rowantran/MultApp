// server.js
// REST server for multiplication app

// Setup
// ============================================

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());  // Parse JSON body

var fs = require('fs');
var pg = require('pg');

// Config
// ============================================

var CONN_STRING = 'pg://rj:Mw88itbg@localhost/multapp';
var SERVER_PORT = 8080;
var LOG_FILE = 'server.log';

// Functions
// ============================================

function getSave(username) {
    pg.connect(CONN_STRING, function (err, client, done) {
        if (err) {
            done();
            return 1;
        } else {
            var fetchSave = client.query("SELECT save FROM users WHERE username = $1", [username]);
            fetchSave.on('err', function (err) {
                done();
                return 1;
            });

            fetchSave.on('row', function (row, result) {
                result.addRow(row);
            });

            fetchSave.on('end', function (result) {
                return result.rows[0].save;
            });
        }
    });
}

function saveData(username, save) {
}

function authUser(username, hmac) {
    return true;
}

function writeLog(msg) {
    // Logs message to logfile and console.
    
    var logString = "(" + getDateFormatted() + ") [LOG] " + msg;
    
    fs.appendFile(LOG_FILE, logString+"\n", function (err) {
	if (err) throw err;
    }); 
    console.log(logString);
}

function getDateFormatted() {
    return new Date().toLocaleString();
}

// Routing
// ============================================

var userRouter = express.Router();
userRouter.route('/:username/save')
    .get(function (req, res) {
        var username = req.params.username;
        
        writeLog('Save requested for user ' + username);
        
        if (authUser(username, hmac)) {
            var save = getSave(username);
            res.status(200).send(save);
        } else {
            res.status(403);
        }
    })

    .post(function (req, res) {
        var username = req.params.username;
        var hmac = req.get('Authentication').split(' ')[1];

        var save = req.body;

        writeLog(hmac);

        writeLog('Saving save for user ' + username);

        if (authUser(username, hmac)) {
            saveData(username, save);
            res.status(200);
        } else {
            res.status(403);
        }
    });

app.use('/user/', userRouter);

// Quit server on SIGINT
// ============================================
process.on('SIGINT', function() {
    writeLog('Received SIGINT');
    process.exit();
});

// Start server
// ============================================

app.listen(SERVER_PORT);
writeLog("Starting server on port " + SERVER_PORT);
