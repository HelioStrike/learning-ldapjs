var express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
    ldap = require('ldapjs');

var client = ldap.createClient({
  url: 'ldap://127.0.0.1:1389'
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get('/login', function(req, res) {
  res.render("login");
});

app.post('/login', function(req, res) {
  client.bind('cn='+req.body.username, req.body.password, function(err) {
    console.log(err);
    if(!err) res.send("Success!!!");
  });
});

app.listen(3001, '0.0.0.0', function() {
  console.log("App started on localhost:3001");
});
