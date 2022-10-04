const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const RegionModel = require('./region.model');
class ClientModel extends Model {
  toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

ClientModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  fullname: {
    type: DataTypes.STRING(),
    allowNull: false
  },
  brandName:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  country:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  region:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  district:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  teritory:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  teritoryId:{
    type: DataTypes.INTEGER(),
    allowNull: false
  },
  districtId:{
    type: DataTypes.INTEGER(),
    allowNull: false
  },
  regionId:{
    type: DataTypes.INTEGER(),
    allowNull: false
  },
  countryId:{
    type: DataTypes.INTEGER(),
    allowNull: false
  },
  phone:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  loanSum:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  loanDollar:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  image:{
    type: DataTypes.STRING()
  },
  lat:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  lon:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  contact_person:{
    type: DataTypes.STRING()
  },
  showActions:{
    type: DataTypes.STRING()
  },
  date_time:{
    type: DataTypes.INTEGER()
  }

}, {
  sequelize,
  modelName: 'Client',
  tableName: 'client',
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
ClientModel.hasMany(RegionModel, {as: 'items', foreignKey: 'id'})
module.exports = ClientModel;