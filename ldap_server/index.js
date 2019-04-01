var ldap = require('ldapjs');

var server = ldap.createServer();

server.bind('cn=root', function(req, res, next) {
    if (req.dn.toString() !== 'cn=root' || req.credentials !== 'secret')
        return next(new ldap.InvalidCredentialsError());
  
    res.end();
    return next();
});

function authorize(req, res, next) {
    if (!req.connection.ldap.bindDN.equals('cn=root'))
      return next(new ldap.InsufficientAccessRightsError());
  
    return next();
}

server.listen(1389, function() {
    console.log('LDAP server up at: %s', server.url);
});