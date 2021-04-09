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

    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    "SELECT * FROM bookings where (end_date>=? && ?>=start_date);";

  //console.log(startDate + "  " + endDate);
  //console.log(startDate < endDate);

  mySqlConection.query(
    searchByCantityAndPrice,
    [capacity, minPrice, maxPrice],
    (err1, result1) => {
      if (err1) res.send({ err1: err1 });
      //console.log(result1.length);
      if (result1.length > 0) {
        //console.log(result1);
        mySqlConection.query(
          searchByDateAvability,
          [startDate, endDate],
          (err2, result2) => {
            //console.log(result2);
            if (err2) res.send({ err2: err });
            //console.log(result2.length);
            if (result2.length > 0) {
              if (result2.length == 1) {
                let room = [];
                for (i = 0; i < result1.length; i++) {
                  if (result1[i].room_id == result2[0].room_id) {
                  } else {
                    room.push(result1[i]);
                  }
                }
                res.send(room);
              } else {
                console.log("incepe distractia");

                let returnDate = [];

                for (i = 0; i < result1.length; i++) {
                  let badDate = 0;
                  for (j = 0; j < result2.length; j++) {
                    if (result1[i].room_id == result2[j].room_id) {
                      badDate++;
                    }
                  }
                  console.log(badDate);
                  if (badDate == 0) {
                    returnDate.push(result1[i]);
                    //console.log(badDate);
                  }
                }
                console.log(returnDate);
                //res.send(returnDate);
              }
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

// app.post("/k", (req, res) => {
//   const clientId = req.body.clientId;
//   console.log(clientId);

//   const mySqlGetBooking = "SELECT * FROM bookings where client_id=?;";

//   const mySqlGetRooms = "SELECT * FROM rooms where room_id=?;";

//   mySqlConection.query(mySqlGetBooking, clientId, (err, response) => {
//     if (err) {
//       console.log(err);
//       res.send({ err: err });
//     }
//     if (response.length == 0) {
//       let room = [];
//       res.send(room);
//     } else {
//       // let rooms = [];
//       // for (i = 0; i < response.length; i++) {
//       //   mySqlConection.query(
//       //     mySqlGetRooms,
//       //     response[i].room_id,
//       //     (err, responseRooms) => {
//       //       rooms.push(responseRooms[0]);
//       //     }
//       //   );
//       // }

//       // let finalResponse = [];
//       // for (i = 0; i < response.length; i++) {
//       //   finalResponse.push({ booking: response[i], room: responseRooms[i] });
//       // }
//       // console.log(finalResponse);
//       // res.send(finalResponse);
//       res.send(response);
//     }
//   });
// });

app.post("/getBooking", (req, res) => {
  const clientId = req.body.clientId;

  //const room_sql = "SELECT * FROM rooms;";
  //console.log(clientId);

  const mySqlBookings = "SELECT * FROM bookings where client_id=?;";

  const mySqlBookingRooms = "SELECT * FROM rooms where room_id=?;";

  let rooms = [];
  let booking = [];

  mySqlConection.query(mySqlBookings, clientId, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    let BookWithRooms = [];
    if (result.length > 0) {
      // for (i = 0; i < result.length; i++) {
      //   //rooms.push(1);
      //   mySqlConection.query(
      //     mySqlBookingRooms,
      //     result[i].room_id,
      //     (error, resultRooms) => {
      //       //console.log(resultRooms);
      //       rooms.push(resultRooms);
      //       console.log(rooms);
      //     }
      //   );
      // }
      // for (i = 0; i < result.length; i++) {
      //   await BookWithRooms.push({ booking: result[i], room: rooms[i] });
      //   console.log(BookWithRooms);
      // }
      // res.send(rooms);
      res.send(result);

      //console.log(result[2].room_id);
      //console.log(rooms);
    }
  });
});

app.post("/getBookingRooms", (req, res) => {
  const roomId = req.body.roomId;

  const mySqlBookingRooms = "SELECT * FROM rooms where room_id=?;";

  mySqlConection.query(mySqlBookingRooms, roomId, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result) {
      res.send(result);
      console.log(result);
    }
  });
});

app.post("/addBooking", (req, res) => {
  const clientId = req.body.clientId;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const roomId = req.body.roomId;
  // console.log(
  //   clientId + "   " + startDate + "    " + endDate + "    " + roomId
  // );

  const mySqlAddBooking =
    "INSERT INTO bookings (start_date,end_date,room_id,client_id,booking_status,room_status) VALUES (?,?,?,?,5,2);";

  mySqlConection.query(
    mySqlAddBooking,
    [startDate, endDate, roomId, clientId],
    (err, result) => {
      if (err) {
        res.send({ err: err });
        //console.log("yeap");
      } else {
        res.send({ message: "The room was booked successfull" });
      }
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

app.post("/updateFirstName", (req, res) => {
  const newFirstName = req.body.firstName;
  const clientId = req.body.clientId;

  const mySqlChange =
    "UPDATE 'hotel_db'.'accounts' SET 'first_name'= ? where id=?;";

  mySqlConection.query(mySqlChange, [newFirstName, clientId], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send({ message: "ok" });
    }
  });
});

app.post("/updateLastName", (req, res) => {
  const newLastName = req.body.lastName;
  const clientId = req.body.clientId;

  const mySqlChange =
    "UPDATE 'hotel_db'.'accounts' SET 'second_name'= ? where id=?;";

  mySqlConection.query(mySqlChange, [newLastName, clientId], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send({ message: "ok" });
    }
  });
});

app.post("/updateEmail", (req, res) => {
  const newEmail = req.body.email;
  const clientId = req.body.clientId;

  const mySqlChange = "UPDATE 'hotel_db'.'accounts' SET 'email'= ? where id=?;";

  mySqlConection.query(mySqlChange, [newEmail, clientId], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send({ message: "ok" });
    }
  });
});

app.post("/updatePhoneNumber", (req, res) => {
  const newPhone = req.body.phone;
  const clientId = req.body.clientId;

  const mySqlChange = "UPDATE 'hotel_db'.'accounts' SET 'phone'= ? where id=?;";

  mySqlConection.query(mySqlChange, [newPhone, clientId], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send({ message: "ok" });
    }
  });
});

app.post("/updatePassword", (req, res) => {
  const newPassword = req.body.password;
  const clientId = req.body.clientId;

  const mySqlChange =
    "UPDATE 'hotel_db'.'accounts' SET 'password'= ? where id=?;";

  const saltRounds = Math.random(5); //ii ok si cum ii mai sus cu 3 dar asta ofera ceva mai multa securitate (getSalt()  nu mergea bine)
  bcrypt.hash(newPassword, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    mySqlConection.query(
      mySqlChange,
      [newPassword, clientId],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          res.send({ message: "ok" });
        }
      }
    );
  });
});

app.post("/getPassword", (req, res) => {
  const clientId = req.body.clientId;

  const mySqlPass = "Select password from accounte where id=?;";

  mySqlConection.query(mySqlPass, clientId, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result > 0) {
      res.send(result);
    }
  });
});

app.post("/checkin", (req, res) => {
  const bookingId = req.body.bookingId;

  const mySqlCheckin =
    "UPDATE 'hotel_db'.'bookings' SET 'booking_status'= 2 where id=?;";

  mySqlConection.query(mySqlCheckin, bookingId, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (resulr) {
      res.send({ message: "ok" });
    }
  });
});

app.post("/checkout", (req, res) => {
  const bookingId = req.body.bookingId;

  const mySqlCheckin =
    "UPDATE 'hotel_db'.'bookings' SET 'booking_status'= 3 where id=?;";

  mySqlConection.query(mySqlCheckin, bookingId, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (resulr) {
      res.send({ message: "ok" });
    }
  });
});

app.post("/cancel", (req, res) => {
  const bookingId = req.body.bookingId;

  const mySqlCheckin =
    "UPDATE 'hotel_db'.'bookings' SET 'booking_status'= deleted where id=?;";

  mySqlConection.query(mySqlCheckin, bookingId, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (resulr) {
      res.send({ message: "ok" });
    }
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log("Running on port " + PORT);
});
