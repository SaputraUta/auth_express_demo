const express = require("express");
const app = express();
const port = 3000;
const User = require("./models/user");

app.get("/admin", (req, res) => {
    res.send("This page only can be accessed if you are an admin!");
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
