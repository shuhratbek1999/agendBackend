const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class fullproductModel extends Model {
  toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

fullproductModel.init({
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
  unit:{
    type: DataTypes.INTEGER()
  },
  ostatok:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  ostatokBlok:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  sht:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  massa:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  bonusNorma:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  bonusKolvo:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  price:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  incomePrice:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  image:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  bonus:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  storeId:{
    type: DataTypes.INTEGER(),
    allowNull: false
  },
  currencyId:{
    type: DataTypes.INTEGER(),
    allowNull: false
  },
  categoryId:{
    type: DataTypes.INTEGER(),
    allowNull: false
  },
  subCategoryId:{
    type: DataTypes.INTEGER(),
    allowNull: false
  },
  top:{
    type: DataTypes.STRING()
  }

}, {
  sequelize,
  modelName: 'fullproduct',
  tableName: 'fullproduct',
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

module.exports = fullproductModel;