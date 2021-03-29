const express=require("express");
const mysql=require("mysql");
const cors=require("cors");

const app=express();


app.use(express.json());
app.use(cors());

const mySqlConection=mysql.createConnection({
    host: "mysqlhoteldb.mysql.database.azure.com",
    user: "ATLAS@mysqlhoteldb",
    password: "Assistehotel2021",
    database: "hotel_db",
    ssl: true
});

app.post('/register',(req,res)=>{

    const first_name=req.body.first_name;
    const second_name=req.body.second_name;
    const email=req.body.email;
    const phone=req.body.phone;
    const username=req.body.username;
    const password=req.body.password;


    const register_querry="INSERT INTO accounts (first_name,second_name,email,phone,role,username,password) VALUES (?,?,?,?,?,?,?)";

    mySqlConection.query(
        register_querry,
        [first_name,second_name,email,phone,1,username,password],
        (err,result)=>{
            console.log(err);
    });

});

app.post('/login',(req,res)=>{

    const email=req.body.email;
    const password=req.body.password;

    //console.log(email);
    //console.log(password);

    const login_querry="SELECT * FROM accounts WHERE email = ? AND password = ?";
    mySqlConection.query(
        login_querry,
        [email,password],
        (err,result)=>{
            if(err)
            {
                res.send({err:err});
            }
            if(Object.keys(result).length > 0)
            {
                res.send(result);
                //console.log(Object.keys(result).length);
            }
            else
            {
                //console.log("wrong");
                //console.log(result);
                res.send({message:"Wrong username/passward combination"});
            }
        }
    );

});

app.listen(3001,()=>{
    console.log("Running on port 3001");
})