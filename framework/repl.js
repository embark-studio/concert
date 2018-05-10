var os = require('os');
var path = require('path');



var historyFile = path.join(os.homedir(), '.node_history');

var repl = require('repl').start('concert> ');

const reload = function(context){
    /**
     * Removes a module from the cache.
     */
    context.require.uncache = function (moduleName) {
        // Run over the cache looking for the files
        // loaded by the specified module name
        context.require.searchCache(moduleName, function (mod) {
            delete require.cache[mod.id];
        });
    };

    /**
     * Runs over the cache to search for all the cached files.
     */
    context.require.searchCache = function (moduleName, callback) {
        // Resolve the module identified by the specified name
        var mod = require.resolve(moduleName);

        // Check if the module has been resolved and found within
        // the cache
        if (mod && ((mod = require.cache[mod]) !== undefined)) {
            // Recursively go over the results
            (function run(mod) {
                // Go over each of the module's children and
                // run over it
                mod.children.forEach(function (child) {
                    run(child);
                });

                // Call the specified callback providing the
                // found module
                callback(mod);
            })(mod);
        }
    };

    /*
    * Load a module, clearing it from the cache if necessary.
    */
    context.require.reload = function(moduleName) {
        context.require.uncache(moduleName);
        return context.require(moduleName);
    };

    context.app = context.require.reload('./src')
}

reload(repl.context)

repl.defineCommand('reload', {
    help: 'Reload application "src" and set it to app',
    action(name) {
        this.clearBufferedCommand();
        reload(this.context);
        this.displayPrompt();
    }
})

repl.on('reset', reload);

require('repl.history')(repl, historyFile);