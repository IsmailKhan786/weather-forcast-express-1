//requrie modules 
const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");
const { response } = require("express");


//use express 
const app = express();

//use bodyparser 
app.use(bodyParser.urlencoded({extended: true}));


//app.get() to set the filename from  "/" is set to home directry
//req is request and  res is respond
 app.get("/",function(req,res){
    //open port 3000 and check and come back to terminal we see request made 
     res.sendFile(__dirname + "/index.html")
 })

 app.use(express.static("public"))


app.post("/",function(req,res){
    const querry = req.body.cityName;
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?units="+ units + "&q="+ querry + "&appid=76139de938603e9bdb680e561f19b087";
    https.get(url,function(response){

        response.on("data",function(data){
            //variable to convert the api data of hexa to json object
            const weatherData = JSON.parse(data);
            //to display one particular peice 
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
     
            //10
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" +  icon +  "@2x.png";
            //to display multiple 
            const temp2 = weatherData.main.temp;
            res.write("<style></style>")
            res.write("<h1>The temprature in "+ querry + " is " + temp + " Celcius</h1>");
            res.write("<h2>The weather descirption in  " + querry + " is " + weatherDescription + "</h2>")
            res.write("<img src =" + imageUrl + ">");
            // res.send("The temprature in London is " + temp)
            res.send()
        })
    
    
    })
    
})

//create server Note:we used  process.env.PORT  this can help to run with hosted port instead of local 
app.listen(process.env.PORT || 3000,function(){
    //to check wheter server running or not 
    console.log("Server started at port 3000");
})