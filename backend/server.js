import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { initDB } from './db.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ensure top-level await is supported in your Node version (14.8+)
const db = await initDB();

// -------- REGISTER --------------
app.post('/api/register', async (req, res) => {
  
  try {
    const { email, password, displayName } = req.body;

    const existingUser = await db.get(
      'SELECT * FROM users WHERE Email = ?',
      [email]
    );

    if (existingUser) {
      return  res.status(400).json({
        success: false,
        message: 'Email already exist',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.run(
      'INSERT INTO users (Email, password, displayName) VALUES (?, ?, ?)',
      [email, hashedPassword, displayName]
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ 
      success: true,
      message: 'Failed to register user' 
    });
  }
});

// -------- LOGIN --------------
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body; 

    // Changed curly braces to parentheses and corrected the query
    const user = await db.get(
      "SELECT * FROM users WHERE Email = ?", 
      [email]
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    //const match = password === user.password; // For testing without hashing
    if (!match) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    //res.json({ success: true, message: "Login successful" }); 
    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        displayName: user.displayName
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});