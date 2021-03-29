let express=require("express");
//var server=express();
let bodyParser=require("body-parser");
let mysql=require("mysql");

let server = express();
server.use(bodyParser.json());
server.use(express.static(__dirname + "App.js"));
server.listen(8080, informIsAlive);

let mysqlConection=mysql.createConnection({

    host: "mysqlhoteldb.mysql.database.azure.com",
    //port: 3306,
    user: "ATLAS@mysqlhoteldb",
    password: "Assistehotel2021",
    database: "hotel_db",
    ssl: true

});

function informIsAlive() {
    console.log("Server is running on 8080");
  }

mysqlConection.connect((err)=>
{
    if(!err)
        console.log("DB connection succeded\n");
    else
        console.log("DB connection failed\n Error: "+JSON.stringify(err,undefined,2));
})


server.get("/accounts", function (res, req) {
    mysqlConection.query("SELECT * FROM accounts",(err,rows,fields)=>{
        if(!err)
            console.log(rows);
        else
            console.log(err);
    })

  });