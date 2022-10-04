'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('fullproduct', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    name: {
      type: 'string',
      notNull: true
    },
    unit:{
     type: 'string'
    },
    ostatok:{
      type: 'decimal'
    },
    ostatokBlok:{
      type: 'decimal'
    },
    sht:{
      type: 'decimal'
    },
    massa:{
      type: 'decimal'
    },
    bonus:{
      type: 'boolean'
    },
    bonusNorma:{
      type: 'decimal'
    },
    bonusKolvo:{
      type: 'decimal'
    },
    price:{
      type: 'decimal'
    },
    image:{
      type: 'string'
    },
    incomePrice:{
      type: 'decimal'
    },
    storeId:{
      type: 'int',
      notNull: true
    },
    currencyId:{
      type: 'int',
      notNull: true
    },
    categoryId:{
      type: 'int',
      notNull: true
    },
    subCategoryId:{
      type: 'int',
      notNull: true
    },
    top:{
      type: 'string'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('fullproduct');
};

exports._meta = {
  "version": 1
};
