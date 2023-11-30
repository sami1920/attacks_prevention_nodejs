const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Use middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Route for serving the HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Route for handling form submissions
app.post("/submit", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  alert(`Received form submission:\nEmail: ${email}\nPassword: ${password}`);

  // Redirect the user or send a response as needed
  res.send("Form submitted successfully!");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
