
import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/config/db';

export async function GET() {
  await dbConnect()
//   const ships = await Ship.find({});
const ships = "api is running"
console.log("RUNDN")
  return NextResponse.json(ships);
}

export async function POST(req) {
  await dbConnect();
  const data = await req.json();
  const newShip = await S .create(data);
  return NextResponse.json(newShip, { status: 201 });
}
    