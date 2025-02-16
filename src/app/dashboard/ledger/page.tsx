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
  { key: "_id", label: "Ledger ID" },
  { key: "ledgerType", label: "Ledger Category", sortable: true },
  { key: "contactPerson", label: "Primary Contact Person", sortable: true },
  { key: "email", label: "Email Address", sortable: true },
  { key: "mobileNo", label: "Mobile Contact Number", sortable: true },
  { key: "country", label: "Country of Operation" },
  { key: "state", label: "State/Province" },
  { key: "companyName", label: "Organization Name", sortable: true },
  { key: "groupUnderName", label: "Assigned To (Name)" },
  { key: "groupedUnderEmail", label: "Assigned To (Email)" },
  { key: "createdAt", label: "Creation Date", sortable: true, isDate: true },
];

const filterOptions = [
  { label: "Cont. Name", value: "name" },
  { label: "Email ID", value: "email" },
  { label: "Cont. Number", value: "mobileNo" },
  { label: "Category", value: "ledgerType" },
  { label: "Comp. Name", value: "companyName" },
  { label: "State", value: "state" },
];

const Users: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Ledger"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Ledger");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Ledger"
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
