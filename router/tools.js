const express=require('express');
const router=express.Router();
const https=require("https");
// const popup=require("popups");
router.route("/").get(async function(req,res){
   res.render("tools");
});

router.route("/weather").get(async function(req,res){
   res.render("weather");
}).post(async function(req,res){
   const city=req.body.city;
   https.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=b85cc803ba1d4ca57363d78ba907ef0d",function(response){
      response.on("data",function(data){
          const weather=JSON.parse(data);
          res.sendStatus(weather.main.temp);
      });
   });
});
module.exports=router;
