import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/config/db';
import bcrypt from 'bcryptjs';
import UserModel from '../../lib/models/UserModel'; // Assuming a User model exists

// Register a new user
export async function POST(req) {
  await dbConnect();
  const data = await req.json();

  if (!data.username || !data.password || !data.email) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const userExists = await UserModel.findOne({ username: data.username });
    if (userExists) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await UserModel.create({
      ...data,
      password: hashedPassword
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error registering user' }, { status: 500 });
  }
}
