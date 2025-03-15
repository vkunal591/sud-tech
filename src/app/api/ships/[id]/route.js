import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/config/db';
import Ship from '@/app/lib/models/ShipModel';

// Fetch a single ship by ID (GET)
export async function GET(req, { params }) {
  await dbConnect();

  const { id } = params;

  if (id.length === 24) { // Check if it's a valid MongoDB ObjectId
    try {
      const ship = await Ship.findById(id);
      if (!ship) {
        return NextResponse.json({ message: "Ship not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: { result: ship } });
    } catch (error) {
      return NextResponse.json({ message: "Invalid Ship ID" }, { status: 400 });
    }
  } else {
    return NextResponse.json({ message: "Invalid Ship ID" }, { status: 400 });
  }
}

// Update a ship by ID (PUT)
export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params; // ✅ Correct way to get ID
  const data = await req.json();

  if (!id || id.length !== 24) {
    return NextResponse.json({ message: "Invalid Ship ID" }, { status: 400 });
  }

  try {
    const updatedShip = await Ship.findByIdAndUpdate(id, data, { new: true });

    if (!updatedShip) {
      return NextResponse.json({ message: "Ship not found" }, { status: 404 });
    }
    return NextResponse.json({data:updatedShip,message:"Update Successfully",success:true});
  } catch (error) {
    console.error("Error updating ship:", error);
    return NextResponse.json({ message: "Error updating ship entry" }, { status: 500 });
  }
}

// Delete a ship by ID (DELETE)
export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params; // ✅ Correct way to get ID

  if (!id || id.length !== 24) {
    return NextResponse.json({ message: "Invalid Ship ID" }, { status: 400 });
  }

  try {
    const deletedShip = await Ship.findByIdAndDelete(id);
    if (!deletedShip) {
      return NextResponse.json({ message: "Ship not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Ship deleted successfully" ,success:true});
  } catch (error) {
    console.error("Error deleting ship:", error);
    return NextResponse.json({ message: "Error deleting ship entry" }, { status: 500 });
  }
}
