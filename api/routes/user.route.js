var User = require('../models/user');

function getUsers(res) {
  User.find(function(err, users) {
    if (err) {
      res.send(err);
    }
    
    res.json(users);
  });
};

module.exports = function(app) {
  app.get('/api/users', function(req, res) {
    User.find(function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
  });

  app.post('/api/users', function(req, res) {
    User.create({
      id: 2,
      displayName: "test",
      username: "test2",
      email: "test3",
      profilePic: "test4",
      loginCount: 3
    }, function(err, user) {
      if (err)
        res.send(err);
      User.find(function(err, users) {
        if (err)
          res.send(err);
        res.json(users);
      });
    });
  });
}

