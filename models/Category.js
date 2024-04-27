module.exports = function (sequelize, DataTypes) {
    const category =  sequelize.define('category', {
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
    category.associate = (models) => {
        category.hasMany(models.Item, { foreignKey: 'categoryId' });
    };
    return category;


}