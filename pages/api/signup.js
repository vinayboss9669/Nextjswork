import User from "@/models/User";
import connectDb from "../../middleware/db";
import bcrypt from 'bcryptjs';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    await connectDb()
    const { name, email, password } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword
    })

    await user.save()
    res.status(201).json({ success: true })

  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export default handler

