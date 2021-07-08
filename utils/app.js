const express = require('express');
const fs = require('fs');

const data = JSON.parse(
    fs.readFileSync("cinemas.json")
);

// Require logger.js
const logger = require('./logger');
const app = express();
const port = 3000;
const host = "localhost";

// Dummy Express GET call
app.get('/cinemas',(req,res) => {
    res.status(200).json(data);
    logger.info("Server started and running succesfully");
});

// Introduce error by using undefined variable 'y'
app.get('/cinemas/:city',(req,res) => {
    const city = req.params.city;  //This is to make id a number from string
    const cities = data.find(el =>
        el.city === city //this is to compare the id in the given data 
                             //and to provide the required output 
    )
    res.status(200).json(cities);
})

app.get('/cinemas/:city/:area',(req,res) => {
    const area = req.params.area;
    const center = 0
    for(var i=0;i<data.length;i++){
        for(var j=0;j<data[i].Area.length;j++){
            if(data[i].Area[j] === area){
                console.log(data[i].Area[j])
                // center = data[i].Area[j]
            }
        }
    }
    // for(var i=0;i<data.length;i++){
    //     var center = data[i].Area.find(el =>
    //         el.Area === area)
    // }
    res.status(200).json(center);
})

// Capture 404 erors
app.use((req,res,next) => {
    res.status(404).send("PAGE NOT FOUND");
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})
// Run the server
app.listen(port, () => {
    console.log("Server started...");
    logger.info(`Server started and running on http://${host}:${port}`)
})