import { NextResponse } from "next/server";
import { dbConnect } from '@/app/lib/config/db';
import InvoiceModel from "../../../lib/models/InvoiceModel";


// api/invoice/[id]/route.ts
export async function GET(req, { params }) {
  await dbConnect();
  const invoice = await InvoiceModel.findById(params.id);
  if (!invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  return NextResponse.json({ data: { result:invoice }, success: true });
}

// export async function PUT(req, { params }) {
//   await dbConnect();
//   const body = await req.json();
//   const updatedInvoice = await InvoiceModel.findByIdAndUpdate(params.id, body, { new: true });
//   if (!updatedInvoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
//   return NextResponse.json({ data: { updatedInvoice }, success: true });
// }

export async function PUT(req, { params }) {
  await dbConnect();
  
  const { status ,dueDate} = await req.json(); // Extract only the 'status' field
  
  // if (!status) {
  //   return NextResponse.json({ error: "Status is required" }, { status: 400 });
  // }

  const updatedInvoice = await InvoiceModel.findByIdAndUpdate(
    params.id,
    { status,dueDate }, // Update only the status field
    { new: true, runValidators: true } // Ensure updated document is returned & validation runs
  );

  if (!updatedInvoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  return NextResponse.json({ data: { updatedInvoice }, success: true });
}

  
export async function DELETE(req, { params }) {
  await dbConnect();
  const deletedInvoice = await InvoiceModel.findByIdAndDelete(params.id);
  if (!deletedInvoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  return NextResponse.json({ message: "Invoice deleted successfully" });
}
