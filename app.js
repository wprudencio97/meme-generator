const express = require("express");
const https = require("https");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
	const url = "https://meme-api.herokuapp.com/gimme";
	https.get(url, function (response) {
		response.on("data", function (data) {
			const memeData = JSON.parse(data);

			const memeTitle = memeData.title;
			const memeImage = memeData.url;

			res.render("home", { memeTitle: memeTitle, memeImage: memeImage });
		});
	});

	//res.send("server is running...");
});

app.listen(process.env.PORT || 3000, function () {
	console.log("Server started successfully.");
});
