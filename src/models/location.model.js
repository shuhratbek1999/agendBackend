const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
// const DistrictModel = require('../models/district.model')
class locationModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

locationModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true 
  },
  client: {
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
  modelName: 'location',
  tableName: 'location',
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
// locationModel.has(DistrictModel, {as: 'district', foreignKey: 'region_id'});
module.exports = locationModel;