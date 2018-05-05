var os = require('os');
var path = require('path');

var historyFile = path.join(os.homedir(), '.node_history');

var repl = require('repl').start('> ');
repl.context.app = require('./src')
require('repl.history')(repl, historyFile);