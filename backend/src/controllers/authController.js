import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new User({
      email: email,
      password: hashPassword,
    });
    await user.save();
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token: token,
      email: email,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ message: "user not exist" });
    }
    const validPassword = await bcrypt.compare(password, userExist.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Invalid username or password", login: false });
    }
    const token = jwt.sign(
      { id: userExist._id, email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return res.status(200).json({
      login: true,
      message: "Logged In",
      token,
      email,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

export const verifyUser = async (req, res) => {
  const token = req.header("Authorization");
  console.log(token);
  if (!token)
    return res.status(401).json({ valid: false, message: "No token provided" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verified);
    res.json({
      valid: true,
      userId: verified.id,
      email: verified.email,
    });
  } catch (err) {
    res.status(401).json({ valid: false, message: "Invalid token" });
  }
};
