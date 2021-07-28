//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");

const homeStartingContent = "In this section, I’ve tried my best to include blog description examples from top blogs of various niches like tech, health, fitness, travel, lifestyle, etc"
const aboutContent = "Syed Abdul Moiz Shah is a photographer, a mom and creator of backdrops for photography usage. Visit her blog to read about her life, her family and if you'd like to work with her. All of her backdrops are photos that she herself has taken and then had printed..";
const contactContent = "Email:Moizabdul320@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts=[];




app.get("/",function(req,res){
  res.render("home",{staringContent:homeStartingContent,
  posts:posts
  });

});

app.get("/about",function(req,res){
  res.render("about",{staringContent:aboutContent});

});


app.get("/contact",function(req,res){
  res.render("contact",{staringContent:contactContent});

});


app.get("/compose",function(req,res){
  res.render("compose");

});
app.post("/compose",function(req,res){
  var post={
    title:req.body.postTitle,
    content:req.body.postBody



  };


  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName",function(req,res){
  const requestedTitle= _.lowerCase(req.params.postName);


  posts.forEach(function(post){
    const storedTitle= _.lowerCase(post.title);



    if(storedTitle==requestedTitle){
      res.render("post",{
        title:post.title,
        content:post.content
      });


    }
  });


});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
