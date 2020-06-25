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
      console.log("Inserted!");
      res.send(true);
    })
    .catch((err) => {
      console.log(`ERROR: ${err}`);
      res.send(false);
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
