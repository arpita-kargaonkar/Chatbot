import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// Sign up function
export const signup = async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    const prevUser = await User.findOne({ email });
    if (prevUser) {
      return res.status(400).send("Email ID is already registered");
    }
    const salt = await bcrypt.genSalt(10);
    const new_password = await bcrypt.hash(password, salt);
    const user = new User({
      email,
      password: new_password,
      name,
      role,
    });
    await user.save();
    res.status(201).send("User registered");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error registering user");
  }
};

// Sign in function
export const signin = async (req, res) => {
  const secret = process.env.JWT_SECRET;
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Incorrect Password");
    }
    const token = jwt.sign({ id: user._id, role: user.role }, secret, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (e) {
    console.log(e);
    res.status(400).send("Error logging in");
  }
};
