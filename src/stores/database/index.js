const Sequelize = require('sequelize');
const Op = Sequelize.Op
const _ = require('lodash')

const config = require('../../../../config/database')
const options = {
    dialect: 'postgres',
    operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $eq: Op.eq,
        $gt: Op.gt,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like
    },
    ...config
}

if(process.env.REPL){
    options.logging = false
}
const sequelize = new Sequelize(options);

module.exports = class {
    static get connection(){
        if(this.model === undefined){
            this.model = sequelize.define(_(this.name).camelCase(), this.schema(Sequelize));
        }
        return this.model;
    }
    static async where(options){
        return (
            await this.connection.find(options)
        ).dataValues
    }
}