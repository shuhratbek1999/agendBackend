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
  return db.createTable("client", {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    fullname: {
      type: 'string'
    },
    brandName:{
      type: 'string'
    },
    country:{
      type: 'string'
    },
    region:{
      type: 'string'
    },
    district:{
      type: 'string'
    },
    teritory:{
      type: 'string'
    },
    teritoryId:{
      type: 'int'
    },
    districtId:{
      type: 'int'
    },
    regionId:{
      type: 'int'
    },
    countryId:{
      type: 'int'
    },
    phone:{
      type: 'string'
    },
    loanSum:{
      type: 'decimal'
    },
    loanDollar:{
      type: 'decimal'
    },
    image:{
      type: 'string'
    },
    lat:{
      type: 'string'
    },
    lon:{
      type: 'string'
    },
    contact_person:{
      type: 'string'
    },
    showActions:{
      type: 'string'
    },
    date_time:{
      type: 'int'
    }

  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
