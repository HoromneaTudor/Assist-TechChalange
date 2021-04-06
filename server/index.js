const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
// depricated  const bodyParser=require("body-parser");

const bcrypt = require("bcryptjs");
const { response } = require("express");
//const saltRounds = 3;

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
  try {
    const first_name = req.body.first_name;
    const second_name = req.body.second_name;
    const email = req.body.email;
    const phone = req.body.phone;
    const username = req.body.username;
    const password = req.body.password;

    if (first_name == "") res.status(400).send("invalid first name");

    if (second_name == "") res.status(400).send("invalid last name");

    let reg = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    if (reg.test(email) === false) res.status(400).send("invalid email");

    if (phone.length != 10 || isNaN(phone))
      res.status(400).send("invalid number");

    if (password == "") res.status(400).send("invalid passward");

    const register_querry =
      "INSERT INTO accounts (first_name,second_name,email,phone,role,password) VALUES (?,?,?,?,?,?)";

    const saltRounds = Math.random(5); //ii ok si cum ii mai sus cu 3 dar asta ofera ceva mai multa securitate (getSalt()  nu mergea bine)
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
  } catch {
    res.status(500).send();
  }
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let reg = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  if (reg.test(email) === false) res.status(400).send("invalid email");

  if (password == "") res.status(400).send("invalid passward");

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

app.post("/rooms", (req, res) => {
  const room_sql = "SELECT * FROM rooms;";

  mySqlConection.query(room_sql, (err, response) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(response);
    }
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log("Running on port " + PORT);
});
