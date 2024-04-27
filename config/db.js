const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

var db = {}

const sequelize = new Sequelize(
    process.env.SEQUELIZE_DATABASE,
    process.env.SEQUELIZE_USER,
    process.env.SEQUELIZE_USER_PASSWORD,
    {
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true, // If you're connecting to Azure SQL Database
                trustServerCertificate: true // If you're connecting to Azure SQL Database
            }
        },
        host: process.env.SEQUELIZE_HOST,
        port: process.env.SEQUELIZE_PORT,
        define: {
            freezeTableName: true,
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 60000,
            idle: 10000,
        },
    }
);

const models = [
    require("../models/Users"),
    require("../models/Item"),
    require("../models/Category"),
]

models.forEach(model => {
    const seqModel = model(sequelize, DataTypes)
    db[seqModel.name] = seqModel
})

db.sequelize = sequelize

module.exports = db
