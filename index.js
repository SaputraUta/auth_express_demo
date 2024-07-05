const express = require("express");
const app = express();
const port = 3000;
const User = require("./models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose
  .connect("mongodb://127.0.0.1/auth_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashPassword = await bcrypt.hashSync(password, 10);
  const user = new User({
    username: username,
    password: hashPassword,
  });
  await user.save();
  res.redirect("/");
});

app.post("/login", async(req,res) => {
  const {username, password} = req.body;
  const user = await User.findOne({username});
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.send("Login berhasil")
    } else {
      res.send("Password salah");
    }
  } else {
    res.send ("Username tidak ditemukan");
  }
})

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
})

app.get("/admin", (req, res) => {
  res.send("This page only can be accessed if you are an admin!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
