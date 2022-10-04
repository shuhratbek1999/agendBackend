const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const districtModel = require('./district.model');
class villageModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

villageModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
district_id : {
    type: DataTypes.INTEGER,
},
name: {
    type: DataTypes.STRING(60),
},
clientcount:{
    type: DataTypes.DECIMAL
}

}, {
  sequelize,
  modelName: 'village',
  tableName: 'village',
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
  //findOne da yoki findAll da chaqirish kerak
});
districtModel.hasMany(villageModel, {as: 'items', foreignKey: 'district_id'});
module.exports = villageModel;