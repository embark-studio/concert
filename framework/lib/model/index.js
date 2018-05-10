
const _ = require('lodash')
const db = require('../db')
const config = require('../../config/database')
const pluralize = require('pluralize')
const uuidv4 = require('uuid/v4');
const helpers = require('./helpers')

pool = db.query.pool

module.exports = class {
    static get modelName(){
        return _(pluralize(this.name)).camelCase();
    }
    static get connection(){
        return db
    }
    static execute (query, args){
        return db.query(query, args)
    }
    static async all(){
        const query = [
            'SELECT * FROM ',
            `"${this.modelName}"`,
        ].join(" ")

        return (
            await this.execute(query, [])
        ).rows.map((row)=>
            new this(row)
        )
    }
    static async first(limit = 1){
        if(typeof limit == "number"){
            const query = [
                'SELECT * FROM ',
                `"${this.modelName}"`,
                'ORDER BY "createdAt" ASC',
                `LIMIT ${parseInt(limit)}`
            ].join(" ")
    
            const rows = (
                await this.execute(query, [])
            ).rows.map((row)=> new this(row))
            if(limit == 1){
                return rows[0]
            }else{
                return rows
            }
            
        }else{
            throw 'LIMIT MUST BE NUMBER';
        }
    }
    static async last(limit = 1){
        if(typeof limit == "number"){
            const query = [
                'SELECT * FROM ',
                `"${this.modelName}"`,
                'ORDER BY "createdAt" DESC',
                `LIMIT ${parseInt(limit)}`
            ].join(" ")
    
            const rows = (
                await this.execute(query, [])
            ).rows.map((row)=> new this(row))
            if(limit == 1){
                return rows[0]
            }else{
                return rows
            }
            
        }else{
            throw 'LIMIT MUST BE NUMBER';
        }
    }
    static async find(options){
        if(typeof string){
            options = {
                id: options
            }
        }
        return (
            await this.where(options)
        )[0]
    }
    static async where(options){
        let [wheres, args] = helpers.where(options, [])
        const query = [
            'SELECT * FROM ',
            `"${this.modelName}"`,
            'WHERE',
            wheres
        ].join(" ")

        return (
            await this.execute(query, args)
        ).rows.map((row)=>
            new this(row)
        )
    }

    static async create(values = {}){
        values.id = uuidv4()

        delete values.createdAt
        delete values.updatedAt


        
        const keys = Object.keys(values).map((k)=> `"${k}"` ).join(', ');
        const v = Object.keys(values).map((_, i)=>`$${i + 1}`).join(', ');
     
        const query = `INSERT INTO "${this.modelName}" (${keys}, "updatedAt", "createdAt") VALUES(${v}, NOW(), NOW()) RETURNING *`;
        const args = Object.values(values);

        try{
            return new this(
                (await this.execute(query, args)).rows[0]
            )
        }catch(error){
            consol.log(error)
        }
    }

    static async update(_wheres={}, values = {}, _this){
        delete values.createdAt
        delete values.updatedAt

        const _args = Object.values(values);

        values = Object.keys(values).map((key, i)=> `"${key}"=$${i + 1}`)
        values.push('"updatedAt"=NOW()')
        values = values.join(", ")

        const [wheres, args] = helpers.where(_wheres, _args)
        const query = `update ${this.modelName} set ${values} WHERE ${wheres} RETURNING *`;
        
        const response = (await this.execute(query, args)).rows[0]
        if(_this){
            Object.keys(response).forEach((key)=>{
                _this[key] = response[key]
            })
            return _this
        }else{
            return new this(
                response
            )
        }
    }

    async save(values = {}){
        Object.keys(values).forEach((key)=>{
           this[key] = values[key] 
        })

        values = {
            ...this
        }

        delete values.id
        return await this.constructor.update({id: this.id}, values)
    }
}