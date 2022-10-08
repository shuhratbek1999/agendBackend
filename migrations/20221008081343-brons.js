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
  return db.createTable('bron', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    storeid:{
      type: 'int'
    },
    kurs:{
      type: 'int'
    },
    client:{
      type: 'string'
    },
    saboy:{
      type: 'decimal'
    },
    summa:{
      type: 'decimal'
    },
    oplate:{
      type: 'decimal'
    },
    summaNalichniy:{
      type: 'decimal'
    },
    summaPlastik:{
      type: 'decimal'
    },
    summaDostavka:{
      type: 'decimal'
    },
    summaSkidka:{
      type: 'decimal'
    },
    skidkaFoiz:{
      type: 'decimal'
    },
    lon:{
      type: 'string'
    },
    lat:{
      type: 'string'
    },
    comment:{
      type: 'string'
    },
    adres:{
      type: 'string'
    },
    kg:{
      type: 'decimal'
    },
    currency:{
      type: 'decimal'
    },
    date:{
      type: 'string'
    }


  });
};

exports.down = function(db) {
  return dropTable('bron');
};

exports._meta = {
  "version": 1
};
