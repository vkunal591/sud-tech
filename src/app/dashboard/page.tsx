"use client";

import Home from "@/components/dashboard/Home";
import Wrapper from "@/components/common/Wrapper";
import AuthGuard from "../../components/AuthGuard";
import Summary from "@/components/dashboard/Summary";

const Dashboard: React.FC = () => {
  return (
    <AuthGuard>
      <Wrapper>
        <div>
          <Home />
          <Summary />
        </div>
      </Wrapper>
    </AuthGuard>
  );
};

export default Dashboard;
