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

app.post("/search", (req, res) => {
  const capacity = req.body.capacity;
  const minPrice = req.body.minPrice;
  const maxPrice = req.body.maxPrice;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  // console.log(
  //   capacity +
  //     "    " +
  //     minPrice +
  //     "  " +
  //     "     " +
  //     maxPrice +
  //     "    " +
  //     startDate +
  //     "    " +
  //     endDate
  // );

  let ReturnedCameras = [];

  const searchByCantityAndPrice =
    "SELECT * FROM rooms where capacity=? and ?<=price  and price<=?";
  const searchByDateAvability =
    "SELECT room_id FROM bookings where ((?<start_date and ?<end_date) or(?>start_date and ?>end_date)) and (booking_status=3 or booking_status=4);";

  mySqlConection.query(
    searchByCantityAndPrice,
    [capacity, minPrice, maxPrice],
    (err1, result1) => {
      if (err1) res.send({ err1: err1 });
      if (result1.length > 0) {
        //console.log(result1);
        mySqlConection.query(
          searchByDateAvability,
          [endDate, endDate, startDate, startDate],
          (err2, result2) => {
            if (err2) res.send({ err2: err });
            //console.log(result2.length);
            if (result2.length > 0) {
              let ArrayCamera = [];
              //let ValidCameraIndex=[],

              for (i = 0; i < result2.length - 1; i++) {
                let contorIdenticalId = 0;
                //contorIdenticalId.push(i);
                for (j = 1; j < result2.length; j++) {
                  if (result2[i].room_id == result2[j].room_id) {
                    if (
                      result2[i].start_date < result2[j].start_date &&
                      result2[i].end_date < result[j].end_date
                    ) {
                    } else contorIdenticalId++;
                  }
                }
                if (contorIdenticalId.length == 0) {
                  ArrayCamera.push(result2[i]);
                }
              }
              for (k = 0; k < result1.length; k++) {
                for (h = 0; h < ArrayCamera.length; h++) {
                  if (result1[k].room_id == ArrayCamera[h])
                    ReturnedCameras.push(result[k]);
                }
              }
              res.send(ReturnedCameras);
            } else {
              res.send(result1);
              //console.log(result1);
            }
          }
        );
      } else {
        res.send(ReturnedCameras);
      }
    }
  );
});

app.post("/addBooking", (req, res) => {
  const clientId = req.body.id;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const roomId = req.body.roomId;

  const mySqlAddBooking =
    "INSERT INTO bookings (start_date,end_date,room_id,client_id,1,2) VALUES (?,?,?,?)";

  mySqlConection.query(
    mySqlAddBooking,
    [startDate, endDate, roomId, clientId],
    (err, result) => {
      if (err) res.send({ err: err });
      res.send({ message: "The room was booked successfull" });
    }
  );
});

app.post("/editBooking", (req, res) => {
  const id = req.body.id;

  const mySqlId = "SELECT * FROM bookings where client_id=?;";

  mySqlConection.query(mySqlId, id, (err, result) => {
    if (err) res.send({ err: err });
    if (result.length > 0) {
      res.send(result); //aici sar putea sa trebuiasca sa creez un array separat
    } else {
      res.send({ message: "You dont have any bookings yet" });
    }
  });
});

app.post("/checkin", (req, res) => {
  const idBooking = req.body.id;

  const myChangeBookingStatus = "SELECT * FROM bookings where if=?;";

  mySqlConection.query(myChangeBookingStatus, idBooking, (err, response) => {
    if (err) res.send({ err: err });
    if (response) {
      res.send(response);
    }
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log("Running on port " + PORT);
});
