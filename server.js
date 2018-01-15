var express = require('express');
var passport = require('passport');
var util = require('util');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var GitHubStrategy = require('passport-github2').Strategy;
var partials = require('express-partials');
var mongoose = require('mongoose');
var morgan = require('morgan');

var app = express();

var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

passport.serializeUser(function(user, done) { // TODO: Read about this
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "https://receptive-sprout.glitch.me/auth/github/callback"
  }, 
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      return done(null, profile); // TODO: this would change to a userID stored in mongoDB
    });
  }                               
));

// configure Express | TODO: Learn some of these and read more into what I actually need
app.use(partials()); // TODO: Whats this do?!
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true })); // TODO: Read this documentation
app.use(bodyParser.json()); // TODO: Read this documentation
app.use(methodOverride()); // TODO: Understand this documentation
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false })); // TODO: Read documentation, learn about session data
app.use(passport.initialize()); // TODO: Read Documentation
app.use(passport.session()); // TODO: Read Documentation
app.use(express.static(__dirname + '/public')); // TODO: Understand this

mongoose.connect(process.env.MONGO_CONNECTION, {useMongoClient: true});

/*mongoClient.connect(process.env.MONGO_CONNECTION, function(err, myDB) {
  if (err) {
    throw err;
  } else {
    console.log("Connected to the database");
    const db = myDB.db('fcc-voting-app');

    app.get('/', function(req, res) {
      res.render('index', {user: req.user});
    });

    app.get('/account', ensureAuthenticated, function(req, res) {
      res.render('index', {user: req.user, showAccount: true});
    });

    app.get('/vote/:pollNumber', function(req, res) { // TODO: Correct this
      res.render('vote', {user: req.user, question: "How many options are there?", 
                          author: "Timothy Barrett", options: [{id: 1, text: "One"}, {id: 2, text: "Two"}, {id: 3, text: "Three"}], 
                          comments: [{author: "Person1", text: "First!", id: 1}, {author: "Person2", text: "Not first :(", id: 2}]});
    });

    app.get('/vote/results/:pollNumber', function(req, res) {
      res.render('vote', {voted: true, user: req.user, question: "How many options are there?", 
                          author: "Timothy Barrett", options: [{id: 1, text: "One"}, {id: 2, text: "Two"}, {id: 3, text: "Three"}], 
                          comments: [{author: "Person1", text: "First!", id: 1}, {author: "Person2", text: "Not first :(", id: 2}]});
    });
    
    app.get("/new", ensureAuthenticated, function(req, res) {
      res.render('polls', {user: req.user, options: {}});
    });
    
    app.get('/login', function(req, res) {
      res.redirect('/auth/github');
    }); 

    app.get('/auth/github',
            passport.authenticate('github', {scope: ['user:email'] }),
            function(req, res) {} // No function needed as this redirects to github and then comes back in auth/github/callback
    );

    app.get('/auth/github/callback', // Return from github, if failure then redirect back to login
            passport.authenticate('github', {failureRedirect: '/login' }),
            function(req, res) {
              db.collection("users").find({"id": req.user.id}).toArray(function(err, record) {
                if (err)
                  throw err;

                if (record[0]) { // check info
                  var updates = {$set: {}, $inc: {loginCount: 1}};
                  
                  if (record[0].displayName !== req.user.displayName) { updates.$set.displayName = req.user.displayName; }
                  if (record[0].username !== req.user.username) { updates.$set.username = req.user.username; }
                  if (record[0].email !== req.user.emails[0].value) { updates.$set.email = req.user.emails[0].value; }
                  if (record[0].profilePic !== req.user.photos[0].value) { updates.$set.profilePic = req.user.photos[0].value; }
                  
                  if (!Object.keys(updates.$set).count) { updates = {$inc: {loginCount: 1}} }
                  
                  db.collection("users").update({"id": record[0].id}, updates, function(err, result) {
                    if (err)
                      throw err;

                    console.log("User " + req.user.username + " logged in");
                  });
                } else { // add new user
                  db.collection("users").insert({id: req.user.id, displayName: req.user.displayName, username: req.user.username, email: req.user.emails[0].value, profilePic: req.user.photos[0].value, loginCount: 1}, function(err, result) {
                    if (err)
                      throw err;

                    console.log("User " + req.user.username +  " added");
                  });
                }
                res.redirect('/');
              });
            }
    );

    app.get('/logout', function(req, res) { // Simple logout
      req.logout();
      res.redirect('/');
    });
  }
});*/
 
require('./api/routes/main.route.js')(app);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
};

// keep this
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});