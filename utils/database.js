const {Client} = require('pg');

// DATABASE
const client = new Client({
    host : "localhost",
    port : 5432,
    database : "master",
    user : "postgres",
    password : "Mypostgres"
});

client.connect();

client.query(`select * from cars where make = 'Honda' order by make`, (err,res)=>{
    if(!err){
        console.log(res.rows)
    }else{
        console.log(err.message)
    }
    client.end;
});
