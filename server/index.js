const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
// depricated  const bodyParser=require("body-parser");

const bcrypt = require("bcryptjs");
const saltRounds = 3;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = 3001;

const mySqlConection = mysql.createConnection({
  host: "mysqlhoteldb.mysql.database.azure.com",
  user: "ATLAS@mysqlhoteldb",
  password: "Assistehotel2021",
  database: "hotel_db",
  ssl: true,
});

app.post("/register", (req, res) => {
  const first_name = req.body.first_name;
  const second_name = req.body.second_name;
  const email = req.body.email;
  const phone = req.body.phone;
  const username = req.body.username;
  const password = req.body.password;

  const register_querry =
    "INSERT INTO accounts (first_name,second_name,email,phone,role,password) VALUES (?,?,?,?,?,?)";

  console.log("aicia");
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    mySqlConection.query(
      register_querry,
      [first_name, second_name, email, phone, 1, hash],
      (err, result) => {
        //console.log(err);
        res.send(err);
      }
    );
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //console.log(email);
  //console.log(password);

  const login_querry = "SELECT * FROM accounts WHERE email = ?;";

  mySqlConection.query(login_querry, email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    //if (Object.keys(result).length > 0)
    if (result.length > 0) {
      //res.send(result);
      //console.log(Object.keys(result).length);
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          res.send(result);
        } else {
          res.send({ message: "Wrong username/password combination" });
        }
      });
    } else {
      //console.log("wrong");
      //console.log(result);
      res.send({ message: "User dosn't exist" });
    }
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log("Running on port " + PORT);
});
