import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/config/db';
import InvoiceModel from '../../../lib/models/InvoiceModel';

// ✅ Get a single Invoice by ID
export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const invoice = await InvoiceModel.findById(id);
    if (!invoice) {
      return NextResponse.json({ message: 'Invoice not found' }, { status: 404 });
    }
    return NextResponse.json(invoice);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching invoice' }, { status: 500 });
  }
}

// ✅ Update an Invoice by ID
export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params;
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

// ✅ Delete an Invoice by ID
export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;

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
