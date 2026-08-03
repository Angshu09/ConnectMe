import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../config/token.js";

export const signUp = async (req, res) => {
  try {
    const { email, userName, password } = req.body;

    //checking for same email and username
    const checkForUserName = await User.findOne({ userName });
    const checkForEmail = await User.findOne({ email });
    if (checkForUserName) {
      return res.status(400).json({
        message: "Username already exists.",
      });
    }
    if (checkForEmail) {
      return res.status(400).json({
        message: "Email already exists.",
      });
    }

    //Password checking
    const isLongEnough = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    if (!isLongEnough) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long.",
      });
    }

    if (!hasLetter) {
      return res.status(400).json({
        message: "Password must contain at least one letter.",
      });
    }

    if (!hasNumber) {
      return res.status(400).json({
        message: "Password must contain at least one number.",
      });
    }

    if (!hasSpecial) {
      return res.status(400).json({
        message: "Password must contain at least one special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT),
    );

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 4 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: false,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Sign up error - ${error}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 4 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: false,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Login error - ${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Logout error ${error}`,
    });
  }
};
