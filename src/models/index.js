const Sequelize = require('sequelize');
require('dotenv').config();
const dbConfig = require('../config/database');
const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging
  }
);

const db = {
  User: require('./user')(sequelize, Sequelize.DataTypes),
  Book: require('./book')(sequelize, Sequelize.DataTypes)
};

// Set up associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
