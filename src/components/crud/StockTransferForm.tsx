"use client";

import { toast } from "react-toastify";
import { endpoints } from "@/data/endpoints";
import DynamicForm from "../common/DynamicForm";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import { useCallback, useEffect, useState } from "react";
import {
  populateFormData,
  populateFormFields,
  getSelectFormattedData,
} from "@/hooks/general";
import { StockPurchaseTypes } from "./formInput/stockPurchaseTypes";

interface LedgerProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const StockTransferForm: React.FC<LedgerProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any>([]);
  const [submitting, setSubmitting] = useState(false);
  const [formField, setFormFields] = useState<any>(
    data?._id
      ? populateFormFields(StockPurchaseTypes, data)
      : StockPurchaseTypes
  );
  const [formData, setFormData] = useState<any>(
    data?._id ? populateFormData(StockPurchaseTypes, data) : {}
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "/api/item-transfer/public/base-fields";
        const response: any = await Fetch(url, {}, 5000, true, false);
        const mappings = [
          { key: "warehouses", fieldName: "issueTo" },
          { key: "warehouses", fieldName: "issueFrom" },
        ];
        const updatedFormField = formField.map((field: any) => {
          const mapping = mappings.find((m) => m.fieldName === field.name);
          if (mapping) {
            const dataKey = response.data[mapping.key] || data?.[mapping.key];
            if (Array.isArray(dataKey) && dataKey.length > 0) {
              const selectData = getSelectFormattedData(dataKey);
              return { ...field, options: selectData };
            }
          }
          return field;
        });
        setFormFields(updatedFormField);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchWarehouseDetails = async () => {
      try {
        const url = `/api/warehouse/public/${formData.issueFrom}`;
        const response: any = await Fetch(url, {}, 5000, true, false);
        if (response.success && response?.data) {
          const fieldUpdates: Record<string, any> = {
            stockTransferForm: { options: response?.data?.product },
          };
          const updatedFormField = formField.map((field: any) => {
            const update = fieldUpdates[field.name];
            if (update) {
              if (update.updateFormData) {
                setFormData((prev: any) => ({
                  ...prev,
                  [update.updateFormData.key]: update.updateFormData.value,
                }));
              }
              return { ...field, ...update };
            }
            return field;
          });
          setFormFields(updatedFormField);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    if (formData.issueFrom) fetchWarehouseDetails();
    // eslint-disable-next-line
  }, [formData.issueFrom]);

  const makeApiCall = async (updatedData: any) => {
    try {
      let url = "";
      if (data?._id) url = `${endpoints[formType].update}${data?._id}`;
      else url = `${endpoints[formType].create}`;

      setSubmitting(true);

      const productData = products.reduce(
        (acc: Record<string, number>, s: any) => {
          const key = s._id || s.product || s.id;
          if (key) acc[key] = s.quantity;
          return acc;
        },
        {}
      );
      updatedData = { ...updatedData, stock: productData };

      const response: any = data?._id
        ? await Put(url, updatedData)
        : await Post(url, updatedData);

      if (response.success) {
        const fetchUrl = `${endpoints[formType].fetchAll}`;
        const resp: any = await Fetch(fetchUrl, {}, 5000, true, false);
        if (resp?.success) props?.setFilteredData(resp?.data?.result);
        if (resp?.success && resp?.data?.pagination)
          props?.setPaginate(resp?.data?.pagination);
      } else return toast.error("Something went wrong!");
    } catch (error) {
      console.log("Error: ", error);
      return toast.error("Something went wrong!");
    } finally {
      props.onClose?.();
      setSubmitting(false);
    }
  };

  const customFunc = useCallback(
    (data: any, items?: any) => {
      setFormData((prevFormData: any) => {
        const updated = populateFormData(StockPurchaseTypes, {
          ...prevFormData,
          ...data,
        });
        if (JSON.stringify(updated) !== JSON.stringify(prevFormData))
          return updated;
        return prevFormData;
      });

      setProducts((prevProducts: any) => {
        if (JSON.stringify(items) !== JSON.stringify(prevProducts))
          return items || prevProducts;
        return prevProducts;
      });
    },
    // eslint-disable-next-line
    [data]
  );

  return (
    <div>
      {!loading && (
        <DynamicForm
          returnAs="object"
          fields={formField}
          formData={formData}
          submitting={submitting}
          customFunc={customFunc}
          onClose={props?.onClose}
          setFormData={setFormData}
          makeApiCall={makeApiCall}
        />
      )}
    </div>
  );
};

export default StockTransferForm;
