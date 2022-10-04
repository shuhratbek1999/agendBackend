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
  return db.createTable('user', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    name: {
      type: 'string',
      length: 50,
      notNull: true
    },
    phone:{
      type: 'string',
      notNull: true
    },
    password:{
        type: 'string',
        notNull: true
    },
    token: {
      type: 'string',
      length: 100,
      // notNull: true
    },
    typeName: {
      type: 'string',
      notNull: true
    },
    countryId:{
      type: 'int'
    },
    countryName:{
      type: 'string'
    },
    region_id:{
      type: 'int'
    },
    regionName:{
      type: 'string'
    },
    currencyId:{
      type: 'int'
    },
    storeId:{
      type: 'int'
    },
    storeName:{
      type: 'string'
    },
    currency:{
      type: 'string'
    },
    kurs:{
      type: 'decimal'
    },
    allowEdit:{
      type: 'string'
    },
    day:{
      type: 'double'
    },
    sendLocation:{
      type: 'string'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('user');
};

exports._meta = {
  "version": 1
};
