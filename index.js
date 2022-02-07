//requrie modules 
const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");
const { response } = require("express");
const { resourceLimits } = require("worker_threads");

let temp = "";
let weatherDescription ="";
let feelsLike = "";
let minTemp ="";
let maxTemp ="";
let pressure ="";
let humidity ="";
let querry = "";
let imageUrl="";
let icon = "";


//use express 
const app = express();


//use bodyparser 
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");
//app.get() to set the filename from  "/" is set to home directry
//req is request and  res is respond
 app.get("/",function(req,res){
    //open port 3000 and check and come back to terminal we see request made 
    //  res.sendFile(__dirname + "/index.html");
    res.render("index",{querry:querry,imageUrl:imageUrl,icon:icon,temp:temp,weatherDescription:weatherDescription,feelsLike:feelsLike,minTemp:minTemp,maxTemp:maxTemp,pressure:pressure,humidity:humidity});


 })

 app.use(express.static("public"))


app.post("/",function(req,res){
    querry = req.body.cityName;
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?units="+ units + "&q="+ querry + "&appid=76139de938603e9bdb680e561f19b087";
    https.get(url,function(response){

        response.on("data",function(data){
            //variable to convert the api data of hexa to json object
            const weatherData = JSON.parse(data);
            //to display one particular peice 
             temp = weatherData.main.temp;
             weatherDescription = weatherData.weather[0].description;
             feelsLike = weatherData.main.feels_like;
             minTemp = weatherData.main.temp_min;
             maxTemp = weatherData.main.temp_max;
             pressure = weatherData.main.pressure;
             humidity = weatherData.main.humidity;
             icon = weatherData.weather[0].icon;
             imageUrl = "http://openweathermap.org/img/wn/" +  icon +  "@4x.png";
           
            
            
            //10
            res.redirect("/");
        
         
            // res.send("The temprature in London is " + temp
           
            
    
})
    }) })
   

//create server Note:we used  process.env.PORT  this can help to run with hosted port instead of local 
app.listen(process.env.PORT || 3000,function(){
    //to check wheter server running or not 
    console.log("Server started at port 3000");
})

