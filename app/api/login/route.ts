import bcrypt from 'bcryptjs'; // or bcrypt if you're using bcrypt package
import prisma from '@/utils/db'; // Import the prisma client for your database
import { NextResponse } from 'next/server';

// Handle POST request for login
export async function POST(req: Request) {
  const data = await req.json();
  const { username, password } = data;

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  try {
    // Find user in the database
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    // Check the user's role and redirect accordingly
    if (user.role === 'ADMIN') {
      // Redirect to the admin page if the user is an admin
      return NextResponse.json({ message: 'Login successful', role: user.role }, { status: 200 });
    } else {
      // Redirect to the normal user page if the user is not an admin
      return NextResponse.json({ message: 'Login successful', role: user.role }, { status: 200 });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
