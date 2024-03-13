/* ------------------------------- DEFINE AREA ------------------------------ */
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

/* -------------------------- REGISTER/CREATE USER -------------------------- */
const register = async (req, res) => {
  try {
    const { title, body, lat, long, email, password } = req.body;

    if (!title || !body || !lat || !long || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing Required Fields.",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email Format.",
      });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password Must Be At Least 8 Characters Long and Contain At Least One Uppercase Letter, One Lowercase Letter, And One Number.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User With This Email Already Exists.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 8);

    let option = {
      email,
      exp: moment().add(1, "days").unix(),
    };
    const token = await jwt.sign(option, process.env.JWT_SECRET_KEY);

    const refreshToken = await jwt.sign(
      option,
      process.env.JWT_REFRESH_SECRET_KEY
    );

    const filter = {
      title,
      body,
      lat,
      long,
      token,
      refreshToken,
      email,
      password: hashPassword,
    };

    const data = await User.create(filter);

    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      status: 200,
      data: data,
      userId: data._id,
      refreshToken: refreshToken,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* -------------------------- LOGIN/SIGNIN USER  0-new 1-already -------------------------- */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw Error("user not found 0");

    const successPassword = await bcrypt.compare(password, user.password);
    if (!successPassword) throw Error("Incorrect Password");

    const payload = {
      _id: user._id,
      email: user.email,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1m",
    });

    user.token = token;

    const refreshToken = await jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET_KEY
    );

    const output = await user.save();
    // console.log(output);

    res.status(200).json({
      data: output,
      token: token,
      refreshToken: refreshToken,
      message: "Login Successful",
      userId: output._id,
      status: 200,
      success: true,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = {
  register,
  login,
};
