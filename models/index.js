const { Sequelize } = require("sequelize");
const databaseUrl = process.env.DATABASE_URL;

// Exits if DATABASE_URL is not set
if (databaseUrl === undefined) {
  console.log("ERROR: DATABASE_URL not set!");
  process.exit();
}

// Logs into database
const sequelize = new Sequelize(databaseUrl);

// Defines Account object
const Account = sequelize.define(
  "account",
  {
    // Attributes
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    md5_hashed_password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    salt: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    // options
  }
);

sequelize.sync({ force: false });

module.exports = { Sequelize, sequelize, Account };
