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
  return db.createTable('location',{
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    client:{
      type:'string',
      notNull: true
    },
    lat:{
      type: 'string'
    },
    lon:{
      type: 'string'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('location');
};

exports._meta = {
  "version": 1
};
