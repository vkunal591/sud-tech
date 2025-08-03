import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/config/db";
import InvoiceModel from "../../lib/models/InvoiceModel";

// GET: Fetch Invoices with Filters, Date Ranges, and Pagination
export async function GET(req) {
  await dbConnect();

  const url = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");
  const searchParams = url.searchParams;

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;

  const query = {};
  const dateRangeQueries = {};

  for (const [key, value] of searchParams.entries()) {
    if (["page", "limit"].includes(key)) continue;

    if (key.endsWith("From") || key.endsWith("To")) {
      const baseField = key.replace(/(From|To)$/, "");
      dateRangeQueries[baseField] = dateRangeQueries[baseField] || {};
      if (key.endsWith("From")) dateRangeQueries[baseField].from = value;
      if (key.endsWith("To")) dateRangeQueries[baseField].to = value;
    } else if (key.toLowerCase().includes("date")) {
      const date = new Date(value);
      if (!isNaN(date)) {
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);
        query[key] = { $gte: date, $lt: nextDate };
      } else {
        query[key] = value;
      }
    } else {
      // Case-insensitive regex match for other fields
      query[key] = { $regex: value, $options: "i" };
    }
  }

  // Merge date range filters
  for (const field in dateRangeQueries) {
    const { from, to } = dateRangeQueries[field];
    const range = {};
    if (from) {
      const fromDate = new Date(from);
      if (!isNaN(fromDate)) range.$gte = fromDate;
    }
    if (to) {
      const toDate = new Date(to);
      if (!isNaN(toDate)) range.$lte = toDate;
    }
    if (Object.keys(range).length) {
      query[field] = range;
    }
  }

  try {
    const [invoices, total] = await Promise.all([
      InvoiceModel.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: 1 }), // Optional: latest first
      InvoiceModel.countDocuments(query),
    ]);

    return NextResponse.json({
      data: {
        result: invoices,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          itemsPerPage: limit,
          totalItems: total,
        },
      },
      success: true,
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const newInvoice = new InvoiceModel(body);
    await newInvoice.save();

    return NextResponse.json(
      { data: { result: newInvoice }, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving invoice:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}




// GET /api/invoices?page=1&limit=5&vesselName=Sea&invoiceDateFrom=2024-01-01&invoiceDateTo=2024-12-31
