import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/config/db";
import InvoiceModel from "../../../lib/models/InvoiceModel";
import mongoose from "mongoose";

// GET: Fetch invoice by ID
export async function GET(req, { params }) {
  await dbConnect();

  const { id } = params;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const invoice = await InvoiceModel.findById(id);
    if (!invoice) {
      return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({ data: { result: invoice }, success: true });
  } catch (error) {
    console.error("GET Invoice Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT: Full or partial update of invoice
export async function PUT(req, { params }) {
  await dbConnect();

  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const body = await req.json();

    const updatedInvoice = await InvoiceModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedInvoice) {
      return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({ data: { result: updatedInvoice }, success: true });
  } catch (error) {
    console.error("PUT Invoice Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: Remove invoice by ID
export async function DELETE(req, { params }) {
  await dbConnect();

  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const deletedInvoice = await InvoiceModel.findByIdAndDelete(id);
    if (!deletedInvoice) {
      return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Invoice deleted successfully" });
  } catch (error) {
    console.error("DELETE Invoice Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
