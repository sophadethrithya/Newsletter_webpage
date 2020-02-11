//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/" ,function(req,res){

  var firstName = req.body.fName;
  var lastName = req.body.LName;
  var email = req.body.email;
  var data = {
    members: [
      {email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName, 
          LNAME: lastName,
        }
      }
    ]
  };

  //POST BODY REQUEST
  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/662033561e",
    method: "POST",
    headers: {
      "Authorization": "sophadethrithya 2ba27bf4688cd9d92215f99d582dcd6d-us4"
    },
    body: jsonData,
    
    
  }
  request(options, function(error,response,body){
    if(error){
      res.sendFile(__dirname+ "/failure.html");
    }
    else{
      if(response.statusCode === 200)
      {

        res.sendFile(__dirname+ "/success.html");
      }
      else{
        res.sendFile(__dirname+ "/failure.html");
      }
    }

  })

});

app.post("/failure", function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is listening on port 3000");
});

// var listID ="662033561e"

// var apiKey ="2ba27bf4688cd9d92215f99d582dcd6d-us4";