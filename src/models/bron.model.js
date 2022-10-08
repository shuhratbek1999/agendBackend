const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class bronModel extends Model {
  toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

bronModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  storeid: {
    type: DataTypes.INTEGER(),
    allowNull: false
  },
  kurs:{
    type: DataTypes.INTEGER()
  },
  currency:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  client:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  saboy:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  summa:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  oplate:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  summaNalichniy:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  summaPlastik:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  summaDostavka:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  summaSkidka:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  skidkaFoiz:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },
  lon:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  lat:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  adres:{
    type: DataTypes.STRING(),
    allowNull: false
  },
  comment:{
    type: DataTypes.STRING()
  },
  date:{
    type: DataTypes.STRING()
  }

}, {
  sequelize,
  modelName: 'bron',
  tableName: 'bron',
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

module.exports = bronModel;