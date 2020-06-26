const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const path = require("path");
const md5 = require("md5");
let { Sequelize, sequelize, Account, CalorieCount } = require("./models/index");
const axios = require("axios");

// Allows us to serve static react file from build/ directory
app.use(express.static(path.join(__dirname, "build")));

// Serves react app
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/build/" + "index.html");
});

// Checks whether given username/password pair is valid
app.get("/authenticate-login", (req, res) => {
  let { username, password } = req.query;

  Account.findByPk(username)
    // If query succeeds, checks to see if username & password are correct
    .then((account) => {
      let { salt, md5_hashed_password } = account.dataValues;
      let loginSuccessful = md5(password + salt) === md5_hashed_password;

      res.send(loginSuccessful);
    })
    // If query fails then login fails
    .catch((err) => {
      res.send(false);
    });
});

// Adds new record to calorie_counts table
app.get("/add-calorie-count", (req, res) => {
  axios
    // First ensures that login works with given username & password
    .get(
      `http://:${port}/authenticate-login?username=${req.query.username}&password=${req.query.password}`
    )
    .then((loginRes) => {
      // If login fails, return false
      if (loginRes.data === false) {
        res.send(false);
      }

      return CalorieCount.create({
        username: req.query.username,
        calories: req.query.calorieCount,
        date: req.query.date,
      });
    })
    .then((insertRes) => {
      res.send(true);
    })
    .catch((err) => {
      res.send(false);
    });
});

// Gets total calories consumed by specified date(s)
app.get("/get-total-calories-by-dates", (req, res) => {
  let totalCaloriesByDay = {};

  // Extracts dateList from parameters
  let dateList = JSON.parse(decodeURI(req.query.dateList));

  // Authenticates user
  axios
    .get(
      `http://:${port}/authenticate-login?username=${req.query.username}&password=${req.query.password}`
    )
    .then((loginRes) => {
      // If login fails, return false
      if (loginRes.data === false) {
        res.send(totalCaloriesByDay);
      }

      // Executes query
      return CalorieCount.findAll({
        attributes: [
          "date",
          [sequelize.fn("sum", sequelize.col("calories")), "total_calories"],
        ],
        where: {
          username: req.query.username,
          date: dateList,
        },
        group: ["date"],
      });
    })
    .then((retVal) => {
      // Creates object containing total calories by day
      for (let i = 0; i < retVal.length; i++) {
        totalCaloriesByDay[retVal[i].dataValues.date] =
          retVal[i].dataValues.total_calories;
      }

      // Returns data
      res.send(totalCaloriesByDay);
    })
    .catch((err) => {
      console.log(err);
      res.send(totalCaloriesByDay);
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
