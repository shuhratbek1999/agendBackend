const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class LoadConfig extends Model {
   
}

LoadConfig.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  secret_name: {
    type: DataTypes.STRING()
  },
  ipaddress:{
    type: DataTypes.STRING()
  },
  ipport:{
    type: DataTypes.STRING()
  },
  href_address:{
    type: DataTypes.STRING()
  },
  mobile_username:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  bdate:{
    type: DataTypes.DOUBLE()
  },
  edate:{
    type: DataTypes.DOUBLE()
  },
  mobile_password:{
    type: DataTypes.STRING(),
    notNull: true
  },
  agent_version_code:{
    type: DataTypes.STRING()
  },
  agent_app_url:{
    type: DataTypes.STRING()
  },
  host:{
    type: DataTypes.STRING()
  }
 
}, {
  sequelize,
  modelName: 'Load-config',
  tableName: 'load-config',
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

module.exports = LoadConfig;