module.exports = function (sequelize, DataTypes) {
    const item =  sequelize.define('item', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        barcodeId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        categoryId:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'item'
    })
    item.associate = (models) => {
        item.belongsTo(models.Category, { foreignKey: 'categoryId' });
    };
    return item
}