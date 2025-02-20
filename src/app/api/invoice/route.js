import { dbConnect } from '@/app/lib/config/db';
import InvoiceModel from '@/app/lib/models/InvoiceModel';
import { NextResponse } from 'next/server';

// ✅ Create a new Invoice
export async function POST(req) {
  await dbConnect()
  const data = await req.json();

  if (!data.invoiceNumber || !data.invoiceDate || !data.dueDate || !data.totalAmount || !data.company) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const newInvoice = await InvoiceModel.create(data);
    return NextResponse.json({ data: { result: newInvoice, status: 201 } });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error creating invoice' }, { status: 500 });
  }
}

// ✅ Get all Invoices with pagination & search
export async function GET(req) {
  await dbConnect();

  const { searchParams } = req.nextUrl;
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;

  const filterConditions = {};

  // ✅ Search by Invoice Number
  if (searchParams.get("invoiceNumber")) {
    filterConditions.invoiceNumber = { $regex: searchParams.get("invoiceNumber"), $options: "i" };
  }

  // ✅ Filter by Status
  if (searchParams.get("status")) {
    filterConditions.status = searchParams.get("status");
  }

  // ✅ Filter by Company
  if (searchParams.get("company")) {
    filterConditions.company = searchParams.get("company");
  }

  try {
    // Fetch paginated invoices
    const invoices = await InvoiceModel.find(filterConditions)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Total count for pagination
    const totalInvoices = await InvoiceModel.countDocuments(filterConditions);

    return NextResponse.json({
      data: {
        result: invoices,
        pagination: {
          page,
          limit,
          totalPages: Math.ceil(totalInvoices / limit),
          totalItems: totalInvoices,
        },
      }
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error fetching invoices' }, { status: 500 });
  }
}
