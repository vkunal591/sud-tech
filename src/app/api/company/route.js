import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/config/db';
import CompanyModel from '../../lib/models/CompanyModel';

// Create a new Company
export async function POST(req) {
  await dbConnect();
  const data = await req.json();

  if (!data.companyName || !data.registrationNo || !data.contactPerson) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const newCompany = await CompanyModel.create(data);
    return NextResponse.json(newCompany, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating company' }, { status: 500 });
  }
}

// Get all Companies with pagination and filtering
export async function GET(req) {
  await dbConnect();

  const { page = 1, limit = 10, ...filters } = req.nextUrl.searchParams;
  const skip = (page - 1) * limit;
  const filterConditions = {};

  // Apply filters
  if (filters.companyName) filterConditions.companyName = { $regex: filters.companyName, $options: 'i' };

  try {
    const companies = await CompanyModel.find(filterConditions)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalCompanies = await CompanyModel.countDocuments(filterConditions);

    return NextResponse.json({
      companies,
      pagination: {
        page: parseInt(page),
        totalPages: Math.ceil(totalCompanies / limit),
        totalItems: totalCompanies
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching companies' }, { status: 500 });
  }
}

// Update an existing Company by ID
export async function PUT(req) {
  await dbConnect();
  const { id } = req.query;
  const data = await req.json();

  if (!data.companyName || !data.registrationNo) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const updatedCompany = await CompanyModel.findByIdAndUpdate(id, data, { new: true });

    if (!updatedCompany) {
      return NextResponse.json({ message: 'Company not found' }, { status: 404 });
    }

    return NextResponse.json(updatedCompany);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating company' }, { status: 500 });
  }
}

// Delete an existing Company by ID
export async function DELETE(req) {
  await dbConnect();
  const { id } = req.query;

  try {
    const deletedCompany = await CompanyModel.findByIdAndDelete(id);

    if (!deletedCompany) {
      return NextResponse.json({ message: 'Company not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error deleting company' }, { status: 500 });
  }
}
