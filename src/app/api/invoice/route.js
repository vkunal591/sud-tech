import { NextResponse } from "next/server";
import { dbConnect } from '@/app/lib/config/db';
import InvoiceModel from "../../lib/models/InvoiceModel";

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const searchField = searchParams.get("field");
  const searchValue = searchParams.get("value");

  let query = {};
  if (searchField && searchValue) {
    query[searchField] = { $regex: searchValue, $options: "i" };
  }

  const invoices = await InvoiceModel.find(query)
    .skip((page - 1) * limit)
    .limit(limit);
  const total = await InvoiceModel.countDocuments(query);

  return NextResponse.json({ data: { result: invoices, pagination: { total, page, limit }, success: true } });
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const newInvoice = new InvoiceModel(body);
  await newInvoice.save();
  return NextResponse.json({ data: { result: newInvoice, success: true } }, { status: 201 });
}
