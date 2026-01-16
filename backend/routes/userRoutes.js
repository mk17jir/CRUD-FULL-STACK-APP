import usersData from "../models/usersModels.js";
import express from "express";
import jwt from "jsonwebtoken";
import Auth from "../Authentication.js";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("User route is working");
});

// create new user
routes.post("/signup", async (req, res) => {
    // get form data
  const { fullName, email, password } = req.body;

  // check if user already exists
  const existingUser = await usersData.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
    // create new user
  const newUser = await usersData.create({
    fullName: fullName,
    email: email,
    password: password,
  });

  const accessToken = jwt.sign(
  {
    user: {
      _id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
    },
  },
  process.env.TOKEN,
  { expiresIn: "1h" }
);

  return res.json({
    accessToken: accessToken,
    message: "User created successfully"
  });
});


//login user
routes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userCreated = await usersData.findOne({ email });
  if (!userCreated) {
    return res.status(400).json({ message: "User does not exist" });
  }

  if (userCreated.password !== password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const accessToken = jwt.sign(
    {
      user: {
        _id: userCreated._id,
        email: userCreated.email,
        fullName: userCreated.fullName,
      },
    },
    process.env.TOKEN,
    { expiresIn: "1h" }
  );

  return res.json({
    accessToken,
    message: "User logged in successfully",
  });
});


// get user 
routes.get("/get-user", Auth, async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await usersData.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User retrieved successfully",
      user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      createdOn: user.createdOn,
       } });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default routes;
