const bcrypt = require('bcrypt')
const ErrorBuilder = require('./../utils/customError')



module.exports = function (sequelize, DataTypes) {
    const user = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(12),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false,
        }
    }, {
        tableName: 'user'
    })

    user.prototype.toJSON =  function () {
        var values = Object.assign({}, this.get());
      
        // delete values.password;
        return values;
    }

    user.beforeValidate('create', async(instance, options, fn) => {
        if(!options.type){
            let check = await user.count({
                where: {
                    email: instance.email
                }
            })
            
            if(check !== 0) throw new ErrorBuilder(`Имэйл бүртгэлтэй байна!`, 404, false)
        }

        if(options.type === 'BULKUPDATE'){
            let check = await user.count({
                where: {
                    // id: options.where.id,
                    email: instance.email
                }
            })

            if(check === 1){
                check = await user.count({
                    where: {
                        id: options.where.id,
                        email: instance.email
                    }
                })
                if(check === 0) throw new ErrorBuilder(`Имэйл бүртгэлтэй байна!`, 404, false)
            }
        }
        

        const salt = await bcrypt.genSaltSync()
        let passwordHash = await bcrypt.hash(instance.password, salt)
        instance.password = await passwordHash
    });

    user.prototype.checkPassword = async function (syncPassword) {
        return await bcrypt.compare(syncPassword, this.password)
    };
    return user;
}