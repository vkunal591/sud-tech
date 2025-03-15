import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/config/db';
import Ship from '@/app/lib/models/ShipModel';

// Fetch list of ships with filters (GET)
export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const skip = (page - 1) * limit;

  const filterConditions = {};

  if (search) {
    filterConditions.$or = [
      { vesselImoNo: { $regex: search, $options: "i" } },
      { companyName: { $regex: search, $options: "i" } }
    ];
  }

  try {
    const ships = await Ship.find(filterConditions).skip(skip).limit(limit).sort({ createdAt: -1 });
    const totalShips = await Ship.countDocuments(filterConditions);

    return NextResponse.json({
      data: {
        result: ships,
        pagination: { currentPage: page, totalPages: Math.ceil(totalShips / limit),itemsPerPage:limit, totalItems: totalShips }
      },
      success: true
    });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching ships" }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  // Parse request body
  const data = await req.json();

// // Validate required fields (add more validation as necessary)
// if (!data.vesselImoNo || !data.companyName || !data.contactPerson || !data.email || !data.mobileNo) {
//   return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
// }

  // Helper function to parse dates
  const parseDate = (dateStr) => {
    const parsedDate = new Date(dateStr);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  // Convert string values to the appropriate types (numbers and dates)
  data.creditDays = parseInt(data.creditDays, 10);
  data.creditLimit = parseFloat(data.creditLimit);
  data.sudInvoiceToOwners = parseFloat(data.sudInvoiceToOwners);
  data.actualPayment = parseFloat(data.actualPayment);
  data.bankCharges = parseFloat(data.bankCharges);
  data.yardInvoiceToSUD = parseFloat(data.yardInvoiceToSUD);
  data.vendorInvoiceToSUD = parseFloat(data.vendorInvoiceToSUD);

  // Convert dates to proper Date objects
  data.actualPaymentDate = parseDate(data.actualPaymentDate);
  data.dueDate = parseDate(data.dueDate);
  data.yardActualPaymentDate = parseDate(data.yardActualPaymentDate);
  data.yardPaymentDueDate = parseDate(data.yardPaymentDueDate);
  data.vendorActualPaymentDate = parseDate(data.vendorActualPaymentDate);
  data.vendorPaymentDueDate = parseDate(data.vendorPaymentDueDate);

  // Ensure the address object is valid (add more checks as needed)
  // if (data.address) {
  //   data.address.pinCode = data.address.pinCode || '';
  //   data.address.countrySelect = data.address.countrySelect || '';
  //   data.address.line1 = data.address.line1 || ''; // Ensure line1 is valid
  //   // Additional address validation as needed
  // }

  try {
    // Log the sanitized data for debugging
    console.log("Sanitized data:", data);

    // Create a new ship entry with the sanitized data
    const newShip = await Ship.create(data);
    console.log(newShip, data)
    // Return the new ship entry
    return NextResponse.json({ newShip, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating ship entry:", error);
    return NextResponse.json({ message: "Error creating ship entry" }, { status: 500 });
  }
}
