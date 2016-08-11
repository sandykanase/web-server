var express = require('express');
var app = express();
var PORT = 3000;

//=== PORT LISTENER ===//
app.listen(PORT, function() {
    console.log('Express server started on port: ' + PORT);
});

//=== MIDDLEWARE ===//
var middleware = {
    requireAuthentication: function(req, res, next) {
        console.log('private route hit');
        next();
    },
    logger: function(req, res, next) {
        console.log('Requst: ' + new Date().toString() + req.method + ' ' + req.originalUrl);
        next();
    }
};

//=== REQUEST MAPPINGS ===//

app.use(middleware.logger);

app.get('/about', middleware.requireAuthentication, function(req, res) {
    res.send('About me');
});

//=== STATIC SERVER ===//
app.use(express.static(__dirname + '/public'));
