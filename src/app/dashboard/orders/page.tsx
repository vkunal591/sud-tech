"use client";

import AuthGuard from "@/components/AuthGuard";
import Wrapper from "@/components/common/Wrapper";
import Header from "@/components/Header";
import OrderDetails from "@/components/orders/OrderDetails";
import React from "react";

const Orders: React.FC = () => {
  return (
    <AuthGuard>
      <Wrapper>
        <Header
          title="Order details"
          breadcrumbItems={[
            {
              label: "Pages",
              href: "",
            },
             {
              label: "Order details",
              href: "",
            },
          ]}
        />

        <OrderDetails />
      </Wrapper>
    </AuthGuard>
  );
};

export default Orders;
