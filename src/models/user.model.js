const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class UserModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

UserModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50), 
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  token:{
    type: DataTypes.STRING(100)
  },
  countryId:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  region_id:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  currencyId:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  storeId:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  typeName: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  countryName: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  regionName: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  storeName: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  currency: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  kurs:{
    type: DataTypes.DECIMAL()
  },
  allowEdit:{
    type: DataTypes.STRING()
  },
  sendLocation:{
    type: DataTypes.STRING()
  },
  day:{
    type: DataTypes.DOUBLE
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'user',
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

module.exports = UserModel;