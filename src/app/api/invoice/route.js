import { NextResponse } from "next/server";
import { dbConnect } from '@/app/lib/config/db';
import InvoiceModel from "../../lib/models/InvoiceModel";

// export async function GET(req) {
//   await dbConnect();

//   const { searchParams } = new URL(req.url);
//   const page = parseInt(searchParams.get("page")) || 1;
//   const limit = parseInt(searchParams.get("limit")) || 10;
//   const searchField = searchParams.get("field");
//   const searchValue = searchParams.get("value");

//   // let query = {};
//   // if (searchField && searchValue) {
//   //   query[searchField] = { $regex: searchValue, $options: "i" };
//   // }

//   let query = {};


//   for (const [key, value] of searchParams.entries()) {
//     if (key === "page" || key === "limit") continue;

//     // Special handling for dueDate
//     if (key === "dueDate") {
//       const date = new Date(value);
//       if (!isNaN(date.getTime())) {
//         // Create a range: from the start of the day to just before the next day
//         const nextDate = new Date(date);
//         nextDate.setDate(date.getDate() + 1);
//         query[key] = { $gte: date, $lt: nextDate };
//       }
//     } else {
//       // Default behavior: case-insensitive regex search for string fields
//       query[key] = { $regex: value, $options: "i" };
//     }
//   }


//   console.log("Query:", query);
//   console.log("Request URL:", req.url);


//   const invoices = await InvoiceModel.find(query)
//     .skip((page - 1) * limit)
//     .limit(limit);
//   const total = await InvoiceModel.countDocuments(query);

//   return NextResponse.json({ data: { result: invoices, pagination: { total, page, limit }, success: true } });
// }

export async function GET(req) {
  await dbConnect();

  // Use a base URL if req.url is relative
  const url = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");
  const searchParams = url.searchParams;

  // Get pagination values
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;

  let query = {};

  // Object to hold grouped date range parameters
  let dateRangeQueries = {};

  // Loop through each query parameter
  for (const [key, value] of searchParams.entries()) {
    if (key === "page" || key === "limit") continue;

    // Check for date range parameters (ends with "From" or "To")
    if (key.endsWith("From") || key.endsWith("To")) {
      // Determine base field name (e.g. "invoiceDate" from "invoiceDateFrom")
      const baseField = key.replace(/(From|To)$/, "");
      if (!dateRangeQueries[baseField]) {
        dateRangeQueries[baseField] = {};
      }
      if (key.endsWith("From")) {
        dateRangeQueries[baseField].from = value;
      } else {
        dateRangeQueries[baseField].to = value;
      }
    } else {
      // For non-range parameters: if the field name indicates a date
      if (key.toLowerCase().includes("date")) {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          // Single date: create a range that covers the entire day
          const nextDate = new Date(date);
          nextDate.setDate(date.getDate() + 1);
          query[key] = { $gte: date, $lt: nextDate };
        } else {
          // If not a valid date, use an exact match
          query[key] = value;
        }
      } else {
        // For all other fields, use a case‑insensitive regex for partial matches
        query[key] = { $regex: value, $options: "i" };
      }
    }
  }

  console.log(dateRangeQueries)
  // Process any collected date range queries
  for (const field in dateRangeQueries) {
    const range = dateRangeQueries[field];
    let rangeQuery = {};
    if (range.from) {
      const fromDate = new Date(range.from);
      if (!isNaN(fromDate.getTime())) {
        rangeQuery.$gte = fromDate;
      }
    }
    if (range.to) {
      const toDate = new Date(range.to);
      if (!isNaN(toDate.getTime())) {
        rangeQuery.$lte = toDate;
      }
    }
    if (Object.keys(rangeQuery).length > 0) {
      query[field] = rangeQuery;
    }
  }

  console.log("Constructed Query:", query);

  try {
    // Fetch invoices based on the dynamic query with pagination
    const invoices = await InvoiceModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await InvoiceModel.countDocuments(query);

    return NextResponse.json({
      data: {
        result: invoices,
        pagination: { total, page, limit },
        success: true,
      },
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const newInvoice = new InvoiceModel(body);
  await newInvoice.save();
  return NextResponse.json({ data: { result: newInvoice, success: true } }, { status: 201 });
}
