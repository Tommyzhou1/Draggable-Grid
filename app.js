// create an express app
const express = require("express")
const app = express()

// use the express-static middleware
app.use(express.static("pub"))

// define the first route
app.get("/", function (req, res) {
  res.sendFile('pub/html/home.html', {root: __dirname })
})

app.get("/examples.html", function (req, res) {
  res.sendFile('pub/html/examples.html', {root: __dirname })
})

app.get("/documentation.html", function (req, res) {
  res.sendFile('pub/html/documentation.html', {root: __dirname })
})


// start the server listening for requests
app.listen(process.env.PORT || 4000, 
	() => console.log("Server is running on localhost 4000"));