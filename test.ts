
app.post("/",function(req,res){
    const querry = req.body.cityName;
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?units="+ units + "&q="+ querry + "&appid=76139de938603e9bdb680e561f19b087";
    https.get(url,function(response){

        response.on("data",function(data){
            //variable to convert the api data of hexa to json object
            const weatherData = JSON.parse(data);
            //to display one particular peice 
            var temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const feelsLike = weatherData.main.feels_like;
            const minTemp = weatherData.main.temp_min;
            const maxTemp = weatherData.main.temp_max;
            const pressure = weatherData.main.pressure;
            const humidity = weatherData.main.humidity;
           
            
            
            //10
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" +  icon +  "@4x.png";
            //to display multiple 
            const temp2 = weatherData.main.temp;
         
            res.write("<style>body{background-color:slategrey; width:60%; margin:0 auto 0 auto; padding-top:100px; color:white; font-family:cursive;} img{margin-left:100px;} h1{position:relative; bottom:30px;}h2{padding-left:30px;} p{color:black; padding-top:40px;}</style>")
            res.write("<img src =" + imageUrl + ">");
            res.write("<h1>Weather Forcast for " + querry + " is :</h1>")
           res.write("<h2>Temprature :"+ temp + "&deg  &#8451;</h2>");
            res.write("<h2>Descirption :  "  + weatherDescription + "</h2>")
            res.write("<h2>Feels Like : " + feelsLike + "&deg  &#8451; </h2>")
            res.write("<h2>Min Temp : " + minTemp + "&deg  &#8451;</h2>")
            res.write("<h2>Max Temp : " + maxTemp + "&deg &#8451;</h2>")
            res.write("<h2>Pressure : " + pressure + "</h2>")
            res.write("<h2> Humidity : " + humidity + "% </h2>")
           
            
        
            
            res.write("<p>Copyright &copy BismeTech | Ismail Khan")
        
         
            // res.send("The temprature in London is " + temp
           
            
    
})
    }) })
   