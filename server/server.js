// server.js
// REST server for multiplication app

// Setup
// ============================================

var express = require('express');

var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

var fs = require('fs');
const sqlite3 = require('sqlite3');

// Config
// ============================================

var CONN_STRING = 'game.db';
var SERVER_PORT = 8080;
var LOG_FILE = 'server.log';

let db = new sqlite3.Database(CONN_STRING);

// Functions
// ============================================

function getSave(username, req, res) {
    userExists(username, function (exists) {
        if (exists) {
            let stmt = db.prepare('SELECT save FROM users WHERE username = (?)');
            stmt.get(username, function (err, row) {
                if (!err) {
                    stmt.finalize();
                    res.status(200).send(row.save);
                } else {
                    res.status(500).end();
                }
            });
            /*
            db.get('SELECT save FROM users WHERE username = $1', function (err, client, done) {
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
            }); */
        } else {
            res.status(404).end();
        }
    });
}

function saveData(username, save, req, res) {
    userExists(username, function (exists) {
        if (exists) {
            let stmt = db.prepare('UPDATE users SET save = (?) WHERE username = (?)');
            stmt.run(save, username, function (err) {
                if (!err) {
                    res.status(200).end();
                }
            });
        } else {
            let stmt = db.prepare('INSERT INTO users (username, save) VALUES (?, ?)');
            stmt.run(username, save, function (err) {
                if (!err) {
                    stmt.finalize();
                    res.status(200).end();
                }
            });
        }
    });
}

function userExists(username, callback) {
    // Checks if user exists
    // Calls callback with one bool argument showing whether user exists
    
    let stmt = db.prepare('SELECT * FROM users WHERE username = (?)');
    stmt.get(username, function (err, row) {
        if (!err) {
            stmt.finalize();
            if (row) {
                callback(true);
            } else {
                callback(false);
            }
        }
    });
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
        if (req.get('Authorization')) {
            var hmac = req.get('Authorization').split(' ')[1];
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
        if (req.get('Authorization')) {
            var hmac = req.get('Authorization').split(' ')[1];
        } else {
            var hmac = false;
        }

        var save = req.body;
        save.gold = parseInt(save.gold);
        writeLog('Storing save for user ' + username);

        if (hmac) {
            if (authUser(username, hmac)) {
                saveData(username, save, req, res);
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
