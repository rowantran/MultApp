// server.js
// REST server for multiplication app

// Setup
// ============================================

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var fs = require('fs');
var pg = require('pg');

// Config
// ============================================

var CONN_STRING = 'pg://rj:Mw88itbg@localhost/multapp';
var SERVER_PORT = 8080;
var LOG_FILE = 'server.log';

// Functions
// ============================================

function getSave(username, req, res) {
    pg.connect(CONN_STRING, function (err, client, done) {
        if (!err) {
            var fetchSave = client.query('SELECT save FROM users WHERE username = $1', [username]);
            fetchSave.on('err', function (err) {
                res.status(500).end();
            });

            fetchSave.on('row', function (row, result) {
                result.addRow(row);
            });

            fetchSave.on('end', function (result) {
                done();
                var save = result.rows[0].save;
                res.status(200).send(save);
            });
        } else {
            res.status(500).end();
        }
    });
}

function saveData(username, save) {
    var returnValue = false;
    pg.connect(CONN_STRING, function (err, client, done) {
        if (!err) {
            if (userExists(username)) {
                var storeSave = client.query('UPDATE users SET save = $1 WHERE username = $2', [save, username]);
                storeSave.on('err', function (err) {
                    returnValue = false;
                });

                storeSave.on('end', function (result) {
                    returnValue = true;
                });
            } else {
                var storeSave = client.query('INSERT INTO users (username, save) VALUES ($1, $2)', [username, save]);
                storeSave.on('err', function (err) {
                    returnValue = false;
                });

                storeSave.on('end', function (result) {
                    done();
                    returnValue = true;
                });
            }
        }
    });
    return returnValue;
}

function userExists(username) {
    var returnValue = true;
    pg.connect(CONN_STRING, function (err, client, done) {
        if (!err) {
            var checkUserExists = client.query('SELECT * FROM users WHERE username = $1', [username]);
            storeSave.on('err', function (err) {});

            storeSave.on('row', function (row, result) {
                result.addRow(row);
            });

            storeSave.on('end', function (result) {
                done();
                if (result.rows.length == 0) {
                    returnValue = false;
                }
            });
        }
    });
    return returnValue;
}

function authUser(username, hmac) {
    return true;
}

function writeLog(msg) {
    // Logs message to logfile and console.
    
    var logString = '(' + getDateFormatted() + ') [LOG] ' + msg;
    
    fs.appendFile(LOG_FILE, logString+'\n', function (err) {
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
        if (req.get('Authentication')) {
            var hmac = req.get('Authentication').split(' ')[1];
        } else {
            var hmac = false;
        }
        
        writeLog('Save requested for user ' + username);

        if (hmac) {
            if (authUser(username, hmac)) {
                getSave(username, req, res);
            } else {
                res.status(403).end();
            }
        } else {
            res.status(401).end();
        }
    })

    .post(function (req, res) {
        var username = req.params.username;
        if (req.get('Authentication')) {
            var hmac = req.get('Authentication').split(' ')[1];
        } else {
            var hmac = true;
        }

        var save = req.body;
        writeLog('Storing save for user ' + username);

        if (hmac) {
            if (authUser(username, hmac)) {
                if (saveData(username, save)) {
                    res.status(200).end();;
                } else {
                    res.status(500).end();
                }
            } else {
                res.status(403).end();
            }
        } else {
            res.status(401).end();
        }
    });

app.use('/user', userRouter);

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
