import User from "@/models/User";
import connectDb from "../../middleware/db";
import bcrypt from 'bcryptjs';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDb();
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find user with case-insensitive email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Send success response
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: "Internal server error. Please try again." });
  }
};

export default handler;

