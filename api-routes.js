var friends = require("../data/friends.js");
// database

module.exports =function(app){
    app.get('/api/friends', function(req, res){
        res.json (friends);
    });
// comparison btx the users to find match by 
// converting the user's score into a number instead of a strand.
    app.post('/api/friends', function(req, res){
        var totalDifference = 0;
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
        var userData = req.body;
        var userName = userData.name;
        var userScores = userData.scores;
        // Converting the users score to a number (Instead of string)
        var b = userScores.map(function(item) {
            return parseInt(item, 10);
        });
        userData = {
            "name": req.body.name,
            "photo": req.body.photo,
            "scores": b
        };


        console.log("Name: " + userName);
        console.log("User Score " + userScores);
        // Convert the user's score to a sum number. Adds up the numbers in array.
        var sum = b.reduce((a, b) => a + b, 0);
        console.log("Sum of users score " + sum);
        console.log("Best match friend diff " + bestMatch.friendDifference);


        console.log("*************************************");
    
        // Loop through friend possibilities in db. 
        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i].name);
            totalDifference = 0;
            console.log("Total Diff "+ totalDifference);
            console.log("Best match friend diff " + bestMatch.friendDifference);

            var bfriendScore = friends[i].scores.reduce((a, b) => a + b, 0);
            console.log("Total friend score " + bfriendScore);
            totalDifference += Math.abs(sum - bfriendScore);
            console.log(" -------------------> " + totalDifference);


            // If statement-if the sum of differences is less then the differences of the current "best match"
            // We are looking for the smallest difference (most similar) people's interests
                      
        if (totalDifference <= bestMatch.friendDifference) {
                // Reset the bestMatch to be the new friend. 
            bestMatch.name = friends[i].name;
            bestMatch.photo = friends[i].photo;
            bestMatch.friendDifference = totalDifference;
           }
           console.log(totalDifference + "Total Difference");
        }
        // Save user to db.  
        console.log(bestMatch);
        friends.push(userData);
        console.log("New user added");
        console.log(userData);
        res.json(bestMatch);
    });
};
       