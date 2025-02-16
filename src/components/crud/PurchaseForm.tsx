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
import { PurchaseFieldsType } from "./formInput/purchaseFormType";

interface LedgerProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const isDisabledFields = ["vendor", "warehouseId", "preparedBy"];

const PurchaseForm: React.FC<LedgerProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any>([]);
  const [submitting, setSubmitting] = useState(false);
  const [formField, setFormFields] = useState<any>(
    data?._id
      ? populateFormFields(
          PurchaseFieldsType,
          { ...data, lead: data?.lead ?? "" },
          isDisabledFields
        )
      : PurchaseFieldsType
  );
  const [formData, setFormData] = useState<any>(
    data?._id ? populateFormData(PurchaseFieldsType, data) : {}
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "/api/purchase/public/base-fields";
        const response: any = await Fetch(url, {}, 5000, true, false);
        const mappings = [
          { key: "vendors", fieldName: "vendor" },
          { key: "warehouse", fieldName: "warehouseId" },
          { key: "products", fieldName: "purchaseForm" },
          { key: "preparedBy", fieldName: "preparedBy" },
        ];
        const updatedFormField = formField.map((field: any) => {
          const mapping = mappings.find((m) => m.fieldName === field.name);
          if (mapping) {
            const dataKey = response.data[mapping.key] || data?.[mapping.key];
            if (Array.isArray(dataKey) && dataKey.length > 0) {
              if (mapping.key === "products") {
                setProducts(dataKey);
                return { ...field, options: dataKey };
              } else {
                const selectData = getSelectFormattedData(dataKey);
                return { ...field, options: selectData };
              }
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

  const makeApiCall = async (updatedData: any) => {
    try {
      let url = "";
      if (data?._id) url = `${endpoints[formType].update}${data?._id}`;
      else url = `${endpoints[formType].create}`;

      setSubmitting(true);
      const updated = { products: products, ...updatedData };

      const response: any = data?._id
        ? await Put(url, updated)
        : await Post(url, updated);

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

  const customFunc = useCallback((data: any, items?: any) => {
    setFormData((prevFormData: any) => {
      const updated = populateFormData(PurchaseFieldsType, {
        ...prevFormData,
        ...data,
      });
      if (JSON.stringify(updated) !== JSON.stringify(prevFormData)) {
        return updated;
      }
      return prevFormData;
    });

    setProducts((prevProducts: any) => {
      if (items && JSON.stringify(items) !== JSON.stringify(prevProducts)) {
        return items;
      }
      return prevProducts;
    });
  }, []);

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

export default PurchaseForm;
