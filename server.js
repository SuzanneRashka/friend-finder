var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
// Identify the port
var PORT = process.env.PORT || 3000;
// set up express to handle parsing
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

// app.use("./app/routing/apiRoutes", app);
// app.use("./app/routing/htmlRoutes", app);
// app.use(express.static);

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);


app.listen(PORT, function () {
    console.log("listening on port " + PORT);
});