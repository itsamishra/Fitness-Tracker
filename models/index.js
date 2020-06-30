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

const CalorieCount = sequelize.define("calorie_count", {
  username: {
    type: Sequelize.STRING,
    references: {
      model: "accounts",
      key: "username",
    },
    allowNull: false,
  },
  calories: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
});

const PersonalGoals = sequelize.define("personal_goal", {
  username: {
    type: Sequelize.STRING,
    references: {
      model: "accounts",
      key: "username",
    },
    allowNull: false,
  },
  daily_calorie_target: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
});

const WeighIns = sequelize.define("weigh_in", {
  username: {
    type: Sequelize.STRING,
    references: {
      model: "accounts",
      key: "username",
    },
    allowNull: false,
  },
  weight_lb: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  weight_kg: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
});

sequelize.sync({ force: false });

module.exports = {
  Sequelize,
  sequelize,
  Account,
  CalorieCount,
  PersonalGoals,
  WeighIns,
};
