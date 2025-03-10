const express = require("express");
const session = require('express-session');
const gauthroute = require('./auth/gauth.js') ;
const passport = require('passport')
const app = express();
const port = 4000 ;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

require('dotenv').config() ;

app.use(session({
    secret : process.env.SESSIONKEY, 
    resave : false ,
    saveUninitialized: false,
    cookie: {
        secure : false , 
        httpOnly : true  ,
        sameSite: "lax",
    } ,
    })
)
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth' , gauthroute )

app.get("/", (req, res) => {

    res.send('<a href="/auth/google" >Login With Google</a>')
});

app.get("/dashboard" , (req,res) => {

    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.send('<p> Hello welcome to dashboard </p>')
})

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });

module.exports = app;
