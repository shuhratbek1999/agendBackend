const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const RegionModel = require('./region.model');
const userModel = require('./user.model')
class clientAdressModel extends Model {
  toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        return values;
    }
}

clientAdressModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(50), 
    allowNull: false
  },
  clientcount: {
    type: DataTypes.DECIMAL(100),
    allowNull: false,
  },
  
}, {
  sequelize,
  modelName: 'clientAdress',
  tableName: 'clientadress',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
    
  ],
  // findOne da yoki findAll da chaqirish kerak
  scopes: {
    withoutPassword: {
      attributes: { exclude: ['password'] },
    }
  }
});
clientAdressModel.hasMany(RegionModel, { as: "items", foreignKey: 'id' });
clientAdressModel.hasMany(userModel, {as: "user", foreignKey: 'countryId'});
module.exports = clientAdressModel;