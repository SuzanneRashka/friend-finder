// var path = require("path");
// var express = require("express");
// var bodyParser = require("body-parser");
// var path = require("path");
// var app = express();
// var router = new express.Router();
var friends = require("../data/friends.js");


module.exports = function (app) {

    // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    }); // end get


    // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    app.post("/api/friends", function (req, res) {

        var match = {
            name: "",
            photo: "",
            friendDiff: 100
        };

        var totDiff = 0;

        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i].name);
            totDiff = 0;
            for (var j = 0; i < friends[i].score[j]; j++) {
                totDiff += Math.abs(parseInt(req.body.score[j]) - parseInt(friends[i].score[j]));
                if (totDiff <= match.friendDiff) {
                    // Reset the bestMatch to be the new friend. 
                    match.name = friends[i].name;
                    match.photo = friends[i].photo;
                    match.friendDiff = totDiff;
                }
            }
        }
        friends.push(res.body);
        res.json(match);
    }); // end post
} // end module

// function add() {
//     var numbers = [1, 1, 1, 1, 6];

//     function getSum(total, num) {
//         return total + num;
//     }
//     numbers.reduce(getSum);