import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/config/db';
import CompanyModel from '../../../lib/models/CompanyModel'; // Import the Company Model

// ✅ Get a single Company by ID
export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const company = await CompanyModel.findById(id);
    if (!company) {
      return NextResponse.json({ message: 'Company not found' }, { status: 404 });
    }
    return NextResponse.json(company);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching company' }, { status: 500 });
  }
}

// ✅ Update a Company by ID
export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params;
  const data = await req.json();

  if (!data.companyName || !data.companyType || !data.registrationNo || !data.registrationDate || !data.contactPerson || !data.email || !data.phone || !data.revenue || !data.netIncome || !data.annualTurnover) {
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

// ✅ Delete a Company by ID
export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;

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
