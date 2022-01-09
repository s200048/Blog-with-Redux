import User from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { firstname, lastname, confirmPassword, email, password } = req.body;

  try {
    const existUser = await User.findOne({ email: req.body.email });

    if (existUser) {
      console.log(existUser);
      return res.status(400).send("Email has already been registered.");
    }

    //check password
    if (password !== confirmPassword) return res.status(400).send("Password not match.");

    //hash password
    const newPw = await bcrypt.hash(password, 12);

    //save user
    const result = await User.create({ email, password: newPw, name: `${firstname} ${lastname}` });
    console.log(result.name);

    //JWT
    const tokenObject = { id: result._id, email: result.email };
    const token = jwt.sign(tokenObject, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ result, token });

    // const newUser = new User({
    //   email: email,
    //   username: firstname,
    //   password: newPw,
    //   // id: req.body.id,
    // });

    // const savedUser = await newUser.save();
    // res.status(200).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existUser = await User.findOne({ email });

    if (!existUser) return res.status(404).json({ message: "User not found." });

    //check password by hash
    const isPwCorrect = await bcrypt.compare(password, existUser.password);
    // console.log(isPwCorrect);

    //password wong
    if (!isPwCorrect) return res.status(400).json({ message: "Password incorrect." });

    //gen JWT to localhost and save
    const tokenObject = { id: existUser._id, email: existUser.email };
    const token = jwt.sign(tokenObject, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ result: existUser, token });
    //history
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
