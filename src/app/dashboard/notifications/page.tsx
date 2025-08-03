"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import { useAuth } from "@/context/AuthContext";
import Wrapper from "@/components/common/Wrapper";
import { getAccessPoints } from "@/hooks/general";
import TableComponent from "@/components/common/Table";
import dayjs from "dayjs";

const columns = [
  { key: "serviceDate", label: "Service Date", sortable: true, isDate: true },
  { key: "vesselName", label: "Vessel Name", sortable: true },
  { key: "vesselImoNo", label: "Vessel IMO No", sortable: true },
  { key: "jobDescription", label: "Job Description", sortable: true },
  { key: "port", label: "Port", sortable: true },
  { key: "mt", label: "MT", sortable: true },
  { key: "subject", label: "Subject", sortable: true },
  { key: "invoiceDate", label: "Invoice Date", sortable: true, isDate: true },
  { key: "status", label: "Status", sortable: true, isStatus: true },
  { key: "invoiceNumber", label: "Invoice Number", sortable: true },
  { key: "orderNumber", label: "Order Number", sortable: true },
  { key: "invoiceTo", label: "Invoice To", sortable: true },
  { key: "careOf", label: "Care Of", sortable: true },
  { key: "address", label: "Address", sortable: true },
  // Items field is likely a nested array and doesn't map to a single column
  { key: "totalAmount", label: "Total Amount", sortable: true, isCurrency: "$" },
  {
    key: "paymentDueDate",
    label: "Payment Due Date",
    sortable: true,
    isDate: true,
  },
  {
    key: "actualPaymentAmount",
    label: "Actual Payment Amount",
    sortable: true,
    isCurrency: "$",
  },
  {
    key: "actualPaymentDate",
    label: "Actual Payment Date",
    sortable: true,
    isDate: true,
  },
  { key: "remarks", label: "Remarks", sortable: true },
  { key: "companyName", label: "Company Name", sortable: true },
];

const filterOptions = [
  { label: "Cont. Name", value: "name" },
  { label: "Email ID", value: "email" },
  { label: "Cont. Number", value: "mobileNo" },
  { label: "Category", value: "ledgerType" },
  { label: "Comp. Name", value: "companyName" },
  { label: "State", value: "state" },
];

const currentData = new Date();
const notificationRange = `?paymentDueDateFrom=${dayjs(currentData).format("YYYY-MM-DD")}&paymentDueDateTo=${dayjs(currentData).add(3, 'day').format("YYYY-MM-DD")}&status=Unpaid`

const Users: React.FC = () => {
  const { data, loading, error } = useFetch(`${endpoints["Notifications"].fetchAll}${notificationRange}`);
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Notifications");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Notifications"
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
