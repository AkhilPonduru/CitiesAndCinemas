const express = require('express');
const fs = require('fs');

// Require logger.js
const logger = require('../utils/logger');
const app = express();
const port = 3000;
const host = "localhost";

app.use(express.json())

const data = JSON.parse(
    fs.readFileSync("cinemas.json")
);
const place = JSON.parse(
    fs.readFileSync("areas.json")
);

app.get('/cinemas',(req,res) => {
    res.status(200).json(data);
    logger.info("Server started and running succesfully");
});

app.get('/cinemas/:city',(req,res) => {
    const city = req.params.city; 
    const cities = data.find(el =>
        el.city === city 
        )
    res.status(200).json(cities);
    logger.info("Server running good and somebody got access to ciities");
});

app.get('/cinemas/:city/:area',(req,res) => {
    const area = req.params.area;
    const city = req.params.city;

    var center = 0;
    for(var i in place){
        if(i == area){
            center = place[i]
        }
    };
    res.status(200).json({
        City : city,
        Area : area,
        Screens : center
    });
    logger.info("Server running well and someone got access to city and screens in it");
});

app.get('/cinemas/:city/:area/:screen',(req,res) => {
    const area = req.params.area;
    const city = req.params.city;
    const screen = req.params.screen

    var center = 0;
    for(var i in place){
        if(i == area){
            center = place[i]
        }
    };

    // var Shows = JSON.parse(center)
    var RequiredScreen = null
    for(var j in center){
        if(j == screen){
            RequiredScreen = center[j]
        }
    }
    res.status(200).json({
        City : city,
        Area : area,
        Screen : RequiredScreen
    });
    logger.info("Server running well and someone got access to city and a particular screen in it");
});

// By doing this we're adding a new city to thr collection
app.post('/cinemas',(req,res)=>{
    const newCity = Object.assign(req.body);

    data.push(newCity)
    
    fs.writeFile("cinemas.json",JSON.stringify(data),err =>{
        res.status(201).json({status : "Success - New city added"});
    });
})

// In here we're adding the new area to the existing city
app.post('/cinemas/:city',(req,res) => {
    const city = req.params.city;
    const newArea = Object.assign(req.body) 
    const cities = data.find(el =>
        el.city === city 
        )
    cities.Area.push(newArea)

    fs.writeFile("areas.json",JSON.stringify(data),err=>{
        res.status(201).json(newArea)
    });
    logger.info("Server running good and somebody added a new area to existing city");
});

app.post('/cinemas/:city/:area/:screen',(req,res) => {
    const area = req.params.area;
    const city = req.params.city;
    const screenNo = req.params.screen
    const newScreen = req.body

    var center = 0;
    for(var i in place){
        if(i == area){
            center = place[i]
        }
    };
    center[screenNo] = newScreen

    fs.writeFile("areas.json",JSON.stringify(place),err =>{
        res.status(200).json({
            City : city,
            Area : area,
            Response : "added extra screen"
        })
    });
    logger.info("Server running well and someone added a new screen in the existing area");
});

// Run the server
app.listen(port, () => {
    console.log("Server started...");
    logger.info(`Server started and running on http://${host}:${port}`)
})