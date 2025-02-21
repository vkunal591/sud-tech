import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/config/db';
import CompanyModel from '../../lib/models/CompanyModel'; // Import the Company Model

// ✅ Create a new Company
export async function POST(req) {
  await dbConnect();
  const data = await req.json();

  if (!data.companyName || !data.companyType || !data.registrationNo || !data.registrationDate || !data.contactPerson || !data.email || !data.phone || !data.revenue || !data.netIncome || !data.annualTurnover) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const newCompany = new CompanyModel(data);
    await newCompany.save();
    return NextResponse.json(newCompany, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating company' }, { status: 500 });
  }
}

// ✅ Get all companies with pagination and search
export async function GET(req) {
  await dbConnect();

  const { searchParams } = req.nextUrl;
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const skip = (page - 1) * limit;

  const filterConditions = {};

  // ✅ Search by Company Name
  if (searchParams.get('companyName')) {
    filterConditions.companyName = { $regex: searchParams.get('companyName'), $options: 'i' };
  }

  // ✅ Filter by Company Type
  if (searchParams.get('companyType')) {
    filterConditions.companyType = searchParams.get('companyType');
  }

  // ✅ Filter by Industry
  if (searchParams.get('industry')) {
    filterConditions.industry = searchParams.get('industry');
  }

  // ✅ Filter by Sector
  if (searchParams.get('sector')) {
    filterConditions.sector = searchParams.get('sector');
  }

  try {
    // Fetch paginated companies
    const companies = await CompanyModel.find(filterConditions)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by most recent createdAt

    // Total count for pagination
    const totalCompanies = await CompanyModel.countDocuments(filterConditions);

    return NextResponse.json({
      data: {
        result: companies,
        pagination: {
          page,
          limit,
          totalPages: Math.ceil(totalCompanies / limit),
          totalItems: totalCompanies,
        },
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching companies' }, { status: 500 });
  }
}
