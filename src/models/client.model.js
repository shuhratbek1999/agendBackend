const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const districtModel = require('./district.model');
const RegionModel = require('./region.model');
const villageModel = require('./village.model');
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
  },
  brandName:{
    type: DataTypes.STRING(),
  },
  country:{
    type: DataTypes.STRING(),
  },
  region:{
    type: DataTypes.STRING(),
  },
  district:{
    type: DataTypes.STRING(),
  },
  teritory:{
    type: DataTypes.STRING(),
  },
  teritoryId:{
    type: DataTypes.INTEGER(),
    allowNull: false
  },
  districtId:{
    type: DataTypes.INTEGER(),
  },
  regionId:{
    type: DataTypes.INTEGER(),
  },
  countryId:{
    type: DataTypes.INTEGER(),
  },
  phone:{
    type: DataTypes.STRING(),
  },
  loanSum:{
    type: DataTypes.DECIMAL(),
  },
  loanDollar:{
    type: DataTypes.DECIMAL(),
  },
  image:{
    type: DataTypes.STRING()
  },
  lat:{
    type: DataTypes.STRING(),
  },
  lon:{
    type: DataTypes.STRING(),
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
ClientModel.belongsTo(RegionModel, {as: 'regions', foreignKey: 'regionId'})
ClientModel.belongsTo(districtModel, {as: 'districts', foreignKey: 'districtId'})
ClientModel.belongsTo(villageModel, {as: 'teritorys', foreignKey: 'teritoryId'})
module.exports = ClientModel;