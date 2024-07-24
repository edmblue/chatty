import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password, confirmPassword, gender } =
      req.body;
    const emailExist = await User.findOne({ email });
    const usernameExist = await User.findOne({ username });

    if (password != confirmPassword) {
      const error = new Error("Passwords don't match");
      return res.status(400).json({ msg: error.message });
    }

    if (emailExist) {
      const error = new Error('Email already exist');
      return res.status(400).json({ msg: error.message });
    }

    if (usernameExist) {
      const error = new Error('Username already taken');
      return res.status(400).json({ msg: error.message });
    }

    const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      email,
      profilePic: gender == 'male' ? boyAvatar : girlAvatar,
    });

    if (newUser) {
      await newUser.save();

      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ''
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log('Error in login controller', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({
      message: 'Logout sucessfully',
    });
  } catch (error) {
    console.log('Error in logut controller'.error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
