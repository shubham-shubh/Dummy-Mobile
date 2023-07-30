const express=require('express');
const router=express.Router();
const https=require("https");
// const popup=require("popups");
router.route("/").get(async function(req,res){
   res.render("weather");
}).post(async function(req,res){
   const city=req.body.city;
   https.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=b85cc803ba1d4ca57363d78ba907ef0d",function(response){
      response.on("data",function(data){
     const weatherData = JSON.parse(data);
     const temp = weatherData.main.temp;
     const weatherDescription = weatherData.weather[0].description;
     const icon = weatherData.weather[0].icon;
     const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

     res.write("<h1>The temperature in " + city + " is " + temp + " Kelvin</h1>");
     res.write("<h3>The weather is currently " + weatherDescription + "</h3>");
     res.write("<img src="+ imageURL +">");
     res.send();
      });
   });
});
module.exports=router;
