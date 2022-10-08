const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const fullproductModel = require('./fullproduct.model');
class subcategoryModel extends Model {
  toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

subcategoryModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  categoryId:{
    type: 'int',
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(),
    allowNull: false
  },
  productcount:{
    type: DataTypes.DECIMAL()
  },
  image:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  top:{
    type: DataTypes.BOOLEAN(),
    allowNull: false
  },
  currencyId:{
    type: DataTypes.INTEGER(),
    allowNull: false
  }

}, {
  sequelize,
  modelName: 'subcategory',
  tableName: 'subcategory',
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
subcategoryModel.hasMany(fullproductModel, {as: 'product', foreignKey: 'subCategoryId'})
module.exports = subcategoryModel;