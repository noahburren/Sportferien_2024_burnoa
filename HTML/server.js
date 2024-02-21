const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  const userData = { email, password };

  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    const users = JSON.parse(data) || [];
    users.push(userData);

    fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }

      res.status(200).send("Registration successful.");
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
