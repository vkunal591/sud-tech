import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../../lib/models/UserModel'; // Assuming a User model exists

// User login
export async function POST(req) {
  await dbConnect();
  const { email, password } = await req.json();
console.log(email,password)
  if (!email || !password) {
    return NextResponse.json({ message: 'Missing required fields' , status: 400 });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' , status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' , status: 401 });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return NextResponse.json({ message: 'Login successful' ,data:{token ,userData: user},success:true, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error logging in', status: 500 });
  }
}
