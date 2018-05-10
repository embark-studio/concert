//var diff = require('diff-json-structure');
const diff = require('diff');
var chalk = require('chalk');

// Utility function to visually print the diff
// Tweak it at your own taste
function printDiff(oldObj, newObj) {
    const parts = diff.diffJson(oldObj, newObj);

    return {
        _print: ()=>{
            parts.forEach(function (part) {
                part.value
                .split('\n')
                .filter(function (line) { return !!line; })
                .forEach(function (line) {
                    if (part.added) {
                        process.stdout.write(chalk.green('+  ' + line) + '\n');
                    } else if (part.removed) {
                        process.stdout.write(chalk.red('-  ' + line) + '\n');
                    } else {
                        process.stdout.write(chalk.dim('   ' + line) + '\n');
                    }
                });
            });
            process.stdout.write('\n');;
        },
        parts,
        matches: parts.filter((item=>!item.added && !item.removed)).length == parts.length
    }
}


module.exports = printDiff