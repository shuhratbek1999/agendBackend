const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const subcategoryModel = require('./subcategory.model');
class categoryModel extends Model {
  toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

categoryModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
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
  modelName: 'categoriya',
  tableName: 'categoriya',
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
categoryModel.hasMany(subcategoryModel, {as: 'subcategory', foreignKey: 'categoryId'}).accessors.count
module.exports = categoryModel;