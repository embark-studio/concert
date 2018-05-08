const Parameters = require('strong-params').Parameters;

module.exports = (parameters)=>{
    return Parameters(parameters)
            .permit('firstName', 'lastName', 'email')
            .value()
}