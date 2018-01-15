module.exports = function(app) {
  require('./user.route.js')(app);
  
  app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });
}