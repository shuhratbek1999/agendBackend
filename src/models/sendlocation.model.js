const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
// const DistrictModel = require('../models/district.model')
class sendLocationModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

sendLocationModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true 
  },
  batteryLevel: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  lat: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  lon: {
    type: DataTypes.STRING(60),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'sendLocation',
  tableName: 'sendLocation',
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
 
});
// sendLocationModel.has(DistrictModel, {as: 'district', foreignKey: 'region_id'});
module.exports = sendLocationModel;