import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/config/db';
import Vessel from '../../lib/models/ShipModel';

// Create a new Vessel entry
export async function POST(req) {
  await dbConnect();
  const data = await req.json();

  // Check if required fields are provided
  if (!data.vesselImoNo || !data.companyName || !data.gstNo || !data.panNo || !data.accountNo) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const newVessel = await Vessel.create(data);
    return NextResponse.json(newVessel, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating vessel entry' }, { status: 500 });
  }
}

// Get all Vessels with pagination and filtering
export async function GET(req) {
  await dbConnect();

  const { page = 1, limit = 10, ...filters } = req.nextUrl.searchParams;
  const skip = (page - 1) * limit;
  const filterConditions = {};

  // Apply filters based on query parameters
  if (filters.vesselImoNo) filterConditions.vesselImoNo = { $regex: filters.vesselImoNo, $options: 'i' };
  if (filters.companyName) filterConditions.companyName = filters.companyName;
  if (filters.gstNo) filterConditions.gstNo = filters.gstNo;
  if (filters.panNo) filterConditions.panNo = filters.panNo;

  try {
    const vessels = await Vessel.find(filterConditions)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalVessels = await Vessel.countDocuments(filterConditions);

    return NextResponse.json({
      vessels,
      pagination: {
        page: parseInt(page),
        totalPages: Math.ceil(totalVessels / limit),
        totalItems: totalVessels
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching vessels' }, { status: 500 });
  }
}

// Update an existing Vessel by ID
export async function PUT(req) {
  await dbConnect();
  const { id } = req.query;
  const data = await req.json();

  // Check if required fields are provided
  if (!data.vesselImoNo || !data.companyName || !data.gstNo || !data.panNo || !data.accountNo) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const updatedVessel = await Vessel.findByIdAndUpdate(id, data, { new: true });

    if (!updatedVessel) {
      return NextResponse.json({ message: 'Vessel not found' }, { status: 404 });
    }

    return NextResponse.json(updatedVessel);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating vessel entry' }, { status: 500 });
  }
}

// Delete an existing Vessel by ID
export async function DELETE(req) {
  await dbConnect();
  const { id } = req.query;

  try {
    const deletedVessel = await Vessel.findByIdAndDelete(id);

    if (!deletedVessel) {
      return NextResponse.json({ message: 'Vessel not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Vessel deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error deleting vessel entry' }, { status: 500 });
  }
}
