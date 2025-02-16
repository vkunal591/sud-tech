"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import { useAuth } from "@/context/AuthContext";
import Wrapper from "@/components/common/Wrapper";
import { getAccessPoints } from "@/hooks/general";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "Ship ID" },
  { key: "vesselImoNo", label: "Vessel (IMO NO)" },
  { key: "companyName", label: "Company Name", sortable: true },
  { key: "yardName", label: "Yard Name", sortable: true },
  { key: "repairedMonth", label: "Repaired Month", sortable: true },
  { key: "sudInvoiceToOwners", label: "SUD Invoice to Owners (USD) CR", sortable: true },
  { key: "invoiceNumber", label: "Invoice Number", sortable: true },
  { key: "dueDate", label: "Due Date", sortable: true, isData: true },
  { key: "actualPayment", label: "Actual Payment", sortable: true },
  { key: "bankCharges", label: "Bank Charges", sortable: true },
  { key: "actualPaymentDate", label: "Actual Payment Date", sortable: true },
  { key: "yardInvoiceToSUD", label: "Yard Invoice To SUD", sortable: true },
  { key: "yardPaymentDueDate", label: "Yard Payment Due Date", sortable: true },
  { key: "yardActualPaymentDate", label: "Yard Actual Payment Date", sortable: true },
  { key: "vendorInvoiceToSUD", label: "Vendor Invoice To SUD", sortable: true },
  { key: "vendorActualPaymentDate", label: "Vendor Actual Payment Date", sortable: true, isDate: true },
  { key: "remarks", label: "Remarks", sortable: true },
  { key: "contactPerson", label: "Primary Contact Person", sortable: true },
  { key: "email", label: "Email Address", sortable: true },
  { key: "mobileNo", label: "Mobile Contact Number", sortable: true },
  { key: "country", label: "Country of Operation" },
  { key: "state", label: "State/Province" },
  // { key: "organizationName", label: "Organization Name", sortable: true },
  // { key: "assignedToName", label: "Assigned To (Name)" },
  // { key: "assignedToEmail", label: "Assigned To (Email)" },
  { key: "createdAt", label: "Creation Date", sortable: true, isDate: true },
];

const filterOptions = [
  { label: "Vessel IMO NO", value: "name" },
  { label: "Cont. Name", value: "name" },
  { label: "Email ID", value: "email" },
  { label: "Cont. Number", value: "mobileNo" },
  { label: "Category", value: "ledgerType" },
  { label: "Comp. Name", value: "companyName" },
  { label: "State", value: "state" },
];

const Users: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Ships"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Ships");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Ships"
          suffix="/party"
          columns={columns}
          data={updatedData}
          filterOptions={filterOptions}
          pagination_data={paginationData}
          operationsAllowed={operationsAllowed}
        />
      </Wrapper>
    </AuthGuard>
  );
};

export default Users;
