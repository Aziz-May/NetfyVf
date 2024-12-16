import express from 'express';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();


// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    const saveduser= await user.save();

    res.status(201).json({ message: 'User registered successfully' , user: saveduser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// User login

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate email and password
      if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
      }
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const jwtSecret="f6c476e01a6bd7c302eef09d573c14b3fc867f17c10d5e9736d512feecb497c8f4a635b4d70751ffccdf4a7c39b9a92f6e56740ed7b9056da739e7f9d153a8c4";
      // Generate a token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || jwtSecret, 
        { expiresIn: '1h' }
      );
  
      // Respond with token and user data
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  });
export default router;
/*userRoute.js :
import express from 'express';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();


// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    const saveduser= await user.save();

    res.status(201).json({ message: 'User registered successfully' , user: saveduser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// User login

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate email and password
      if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
      }
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const jwtSecret="f6c476e01a6bd7c302eef09d573c14b3fc867f17c10d5e9736d512feecb497c8f4a635b4d70751ffccdf4a7c39b9a92f6e56740ed7b9056da739e7f9d153a8c4";
      // Generate a token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || jwtSecret, 
        { expiresIn: '1h' }
      );
  
      // Respond with token and user data
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  });
export default router; */