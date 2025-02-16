import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/config/db';
import UserModel from '../../lib/models/UserModel'; // Assuming a User model exists
import bcrypt from 'bcryptjs';

// Register a new user
export async function POST(req) {
  await dbConnect();
  const data = await req.json();
// console.log(data)
  if (!data.email || !data.password || !data.email) {
    return NextResponse.json({ message: 'Missing required fields' , status: 400 });
  }

  try {
    const userExists = await UserModel.findOne({ email: data.email });
    if (userExists) {
      return NextResponse.json({ message: 'User already exists' , status: 400 });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await UserModel.create({
      ...data,
      password: hashedPassword
    });

    return NextResponse.json({data:{userData:newUser},message:"User Created",success:true , status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error registering user' , status: 500 });
  }
}
