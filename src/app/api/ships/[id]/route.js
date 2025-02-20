import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/config/db';
import Ship from '@/app/lib/models/ShipModel';

// Fetch single ship or list of ships
export async function GET(req) {
  await dbConnect()

  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Extracts the last path segment

  if (id.length === 24) { // Check if it's a valid MongoDB ObjectId
    try {
      const ship = await Ship.findById(id);
      if (!ship) {
        return NextResponse.json({ message: "Ship not found" }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        data: { result: ship }
      });
    } catch (error) {
      return NextResponse.json({ message: "Invalid Ship ID" }, { status: 400 });
    }
  }

  // Fetch list of ships with filters
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const skip = (page - 1) * limit;

  const filterConditions = {};

  if (search) {
    filterConditions.$or = [
      { shipImoNo: { $regex: search, $options: "i" } },
      { companyName: { $regex: search, $options: "i" } }
    ];
  }

  try {
    const ships = await Ship.find(filterConditions).skip(skip).limit(limit).sort({ createdAt: -1 });
    const totalShips = await Ship.countDocuments(filterConditions);

    return NextResponse.json({
      success: true,
      data: {
        result: ships,
        pagination: { page, totalPages: Math.ceil(totalShips / limit), totalItems: totalShips }
      }
    });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching ships" }, { status: 500 });
  }
}

// Create a new ship
export async function POST(req) {
  await dbConnect();
  const data = await req.json();

  if (!data.shipImoNo || !data.companyName) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  try {
    const newShip = await Ship.create(data);
    return NextResponse.json(newShip, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating ship entry" }, { status: 500 });
  }
}


// Update a ship by ID
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
    return NextResponse.json(updatedShip);
  } catch (error) {
    console.error("Error updating ship:", error);
    return NextResponse.json({ message: "Error updating ship entry" }, { status: 500 });
  }
}

// Delete a ship by ID
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
    return NextResponse.json({ message: "Ship deleted successfully" });
  } catch (error) {
    console.error("Error deleting ship:", error);
    return NextResponse.json({ message: "Error deleting ship entry" }, { status: 500 });
  }
}
