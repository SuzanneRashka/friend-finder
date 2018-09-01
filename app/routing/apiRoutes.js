var friends = require("../data/friends.js");


module.exports = function (app) {

    // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    }); // end get


    // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    app.post('/api/friends', function (req, res) {
        //placeholder for newly created buddy
        var match = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        var userScores = req.body.scores;
        var totalDifference = 0;
        // loop through friends
        for (var i = 0; i < friends.length; i++) {
            totalDifference = 0;
            // loop through scores of friends
            for (var j = 0; j < friends[i].scores[j]; j++) {
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                if (totalDifference <= match.friendDifference) {
                    // Reset the match to be the new friend. 
                    match.name = friends[i].name;
                    match.photo = friends[i].photo;
                    match.friendDifference = totalDifference;
                }
            }
        }
        // save the user's data to the database
        friends.push(req.body);

        res.json(match);

    });
} // end module