const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class productModel extends Model {
  toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

productModel.init({
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
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  image:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  top:{
    type: DataTypes.BOOLEAN(),
    allowNull: false
  }

}, {
  sequelize,
  modelName: 'Product',
  tableName: 'product',
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

module.exports = productModel;