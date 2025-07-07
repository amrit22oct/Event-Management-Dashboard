import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Registering the two orgainser
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if role is organizer and already 2 exist
    if (role === "organizer") {
      const organizerCount = await User.countDocuments({ role: "organizer" });
      if (organizerCount >= 2) {
        return res.status(400).json({ error: "Only two organizers are allowed." });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};

// creating the login 
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { name: user.name, role: user.role } });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
};
