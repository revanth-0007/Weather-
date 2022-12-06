const express= require("express");
const app=express();
const https=require("https");

var b = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(b.urlencoded({ extended: true }));

app.get('/', function (req, res) {
 
  res.sendFile(__dirname+"/index.html");

});


app.post("/",function(req,res){
    const city=req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=6ba6489e6adefead34b1ecc0190bdf53&units=metric";
    https.get(url,function(resp){
       //console.log(res);
        resp.on("data",function(data){
            //console.log(data);
            const weather=JSON.parse(data);
            console.log(weather);
            const temp=weather.main.temp;
            const icon=weather.weather[0].icon;
            const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            const abc="Today's temperature in "+city+" is "+temp;
            res.write("<h1>Today's temperature in "+city+" is "+temp +"</h1>");
            res.write("<img src="+imgurl+">");
            res.send();


        })
    })
    
});
app.listen(3000,function(){
    console.log("Running on port 3000");
});