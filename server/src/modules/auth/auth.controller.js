import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'transitops-secret-key-12345';
const ALLOWED_ROLES = ['Fleet Manager', 'Driver', 'Safety Officer', 'Financial Analyst'];

export async function registerUser(req, res, next) {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name || !role) {
      return res.status(400).json({ error: 'All fields (email, password, name, role) are required' });
    }

    if (!ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({ error: `Invalid role. Allowed roles are: ${ALLOWED_ROLES.join(', ')}` });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role
      }
    });

    // Respond with user info, excluding password
    const { password: _, ...userInfo } = user;
    res.status(201).json(userInfo);
  } catch (error) {
    next(error);
  }
}

export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    const { password: _, ...userInfo } = user;
    res.status(200).json({ token, user: userInfo });
  } catch (error) {
    next(error);
  }
}
