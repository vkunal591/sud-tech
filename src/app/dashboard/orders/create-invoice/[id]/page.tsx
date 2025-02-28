"use client";
import AuthGuard from "@/components/AuthGuard";
import Wrapper from "@/components/common/Wrapper";
import Header from "@/components/Header";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const InvoicePage = () => {
  const pathname = usePathname();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const match = pathname.split("/")    //match(/\/create-invoice\/([a-f0-9]{24})/);
  const id = match ? match[4] : null; // Extract the ID, or return null if not found
console.log(id)
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          // Fetch the data using the id from the URL
          const response = await fetch(`/api/ships/${id}`);

          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }

          const res = await response.json(); // Parse the response as JSON
          const { _id, ...rest } = res?.data?.result;; // Exclude _id

          // Update the state with the fetched data
          setData((prevData: any) => ({
            ...prevData,
            ...rest,
          }));
        } catch (error) {
          // Handle any errors
          console.error("Error fetching post data:", error);
        } finally {
          setLoading(false); // Set loading to false once the request is finished
        }
      }
    };

    fetchData(); // Call the fetchData function

  }, [id]); // Re-run the effect when the `id` changes

  if (loading) return <div>Loading...</div>;

  return (
    <AuthGuard>
      <Wrapper>
        <Header
          title="Invoice Create"
          breadcrumbItems={[
            {
              label: "Pages",
              href: ""
            },
            {
              label: "Invoice Create",
              href: ""
            }
          ]}
        />

        <InvoiceForm responseData={data} />
      </Wrapper>
    </AuthGuard>
  );
};

export default InvoicePage;
