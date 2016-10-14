var koa = require('koa');
var route = require('koa-route');
var app = module.exports = koa();
var serve = require("koa-static");

// App config
app.use(serve(__dirname + "/public"));

// routes
var homeRoutes = require('./routes/homeRoutes');
app.use(route.get('/', homeRoutes.showHome));

app.listen(5000);
console.log("The app is listening. Port 5000");