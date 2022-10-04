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
  return db.createTable('load-config', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    secret_name: {
      type: "string"
    },
    ipaddress:{
      type: "string"
    },
    ipport:{
      type: "string"
    },
    href_address:{
      type: "string"
    },
    mobile_username:{
      type: "string",
      notNull: true
    },
    bdate:{
      type: "double"
    },
    edate:{
      type: "double"
    },
    mobile_password:{
      type: "string",
      notNull: true
    },
    agent_version_code:{
      type: "string"
    },
    agent_app_url:{
      type: "string"
    },
    host:{
      type :"string"
    }
  });
};

exports.down = function(db) {
  return db.dropTable('load-config');
};

exports._meta = {
  "version": 1
};
