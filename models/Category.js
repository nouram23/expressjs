module.exports = function (sequelize, DataTypes) {
    return sequelize.define('category', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        categoryName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: ''
        }
    }, {
        tableName: 'category'
    })
}