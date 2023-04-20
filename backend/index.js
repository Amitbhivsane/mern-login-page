import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  "mongodb://0.0.0.0:27017/myLoginRegisterDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connect");
  }
);

const userschema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userschema);

//Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

app.post("/register", (req, resp) => {
  // console.log(req.body);
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      resp.send({ message: "user already register" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        //data save into database
        if (err) {
          resp.send(err);
        } else {
          resp.send({ message: "sucessfully Register please login now" });
        }
      });
    }
  });
  const user = new User({
    name,
    email,
    password,
  });
  user.save((err) => {
    //data save into database
    if (err) {
      resp.send(err);
    } else {
      resp.send({ message: "sucessfully Register" });
    }
  });
});

app.listen(4500, () => {
  console.log("Be Started at port 4500");
});
