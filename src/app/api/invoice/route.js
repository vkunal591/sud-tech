import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/config/db';
import InvoiceModel from '../../lib/models/InvoiceModel';

// Create a new Invoice
export async function POST(req) {
  await dbConnect();
  const data = await req.json();

  if (!data.invoiceNumber || !data.invoiceDate || !data.dueDate || !data.totalAmount || !data.company) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const newInvoice = await InvoiceModel.create(data);
    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating invoice' }, { status: 500 });
  }
}

// Get all Invoices with pagination and filtering
export async function GET(req) {
  await dbConnect();

  const { page = 1, limit = 10, ...filters } = req.nextUrl.searchParams;
  const skip = (page - 1) * limit;
  const filterConditions = {};

  // Apply filters
  if (filters.invoiceNumber) filterConditions.invoiceNumber = { $regex: filters.invoiceNumber, $options: 'i' };
  if (filters.status) filterConditions.status = filters.status;
  if (filters.company) filterConditions.company = filters.company;

  try {
    const invoices = await InvoiceModel.find(filterConditions)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalInvoices = await InvoiceModel.countDocuments(filterConditions);

    return NextResponse.json({
      invoices,
      pagination: {
        page: parseInt(page),
        totalPages: Math.ceil(totalInvoices / limit),
        totalItems: totalInvoices
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching invoices' }, { status: 500 });
  }
}

// Update an existing Invoice by ID
export async function PUT(req) {
  await dbConnect();
  const { id } = req.query;
  const data = await req.json();

  if (!data.invoiceNumber || !data.invoiceDate || !data.dueDate || !data.totalAmount || !data.company) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const updatedInvoice = await InvoiceModel.findByIdAndUpdate(id, data, { new: true });

    if (!updatedInvoice) {
      return NextResponse.json({ message: 'Invoice not found' }, { status: 404 });
    }

    return NextResponse.json(updatedInvoice);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating invoice' }, { status: 500 });
  }
}

// Delete an existing Invoice by ID
export async function DELETE(req) {
  await dbConnect();
  const { id } = req.query;

  try {
    const deletedInvoice = await InvoiceModel.findByIdAndDelete(id);

    if (!deletedInvoice) {
      return NextResponse.json({ message: 'Invoice not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error deleting invoice' }, { status: 500 });
  }
}
