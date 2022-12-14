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
  return db.createTable('village', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    district_id:{
      type: 'int',
      notNull:true
    },
    name: {
      type: 'string',
      notNull: true
    },
    clientcount:{
      type: 'decimal'
    }
  });
};

exports.down = function(db) {
  return db.dropTable("village");
};

exports._meta = {
  "version": 1
};
