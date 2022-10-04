'use strict';

var dbm;
var type;
var seed;
const sequelize = require('../src/db/db-sequelize')
/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function() {
  return sequelize.query(
   "INSERT INTO `region` (`id`, `name`, `clientcount`) VALUES \
   (1, 'Qoraqalpog‘iston Respublikasi', 12),\
   (2, 'Andijon viloyati', 122),\
   (3, 'Buxoro viloyati', 134),\
   (4, 'Jizzax viloyati', 1345),\
   (5, 'Qashqadaryo viloyati', 134),\
   (6, 'Navoiy viloyati', 1342),\
   (7, 'Namangan viloyati', 1221),\
   (8, 'Samarqand viloyati', 1453),\
   (9, 'Surxandaryo viloyati', 987),\
   (10, 'Sirdaryo viloyati', 876),\
   (11, 'Toshkent viloyati', 673),\
   (12, 'Farg‘ona viloyati', 990),\
   (13, 'Xorazm viloyati', 1234),\
   (14, 'Toshkent shahri', 9871)"
  );
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
