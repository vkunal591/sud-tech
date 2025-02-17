import { userPermissions } from "@/data/permission";
import { assign, includes } from "./polyfills";

export function formatDate(inputDate: any) {
  const date = new Date(inputDate);

  // Get the year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, "0"); // Pad single digit days with a leading zero

  // Return in YYYY-MM-DD format
  return `${year}-${month}-${day}`;
}

export function formatTime(inputTime: any) {
  const options = {
    year: "numeric",
    weekday: "long",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return inputTime.toLocaleString("en-US", options);
}

export const format12Hour = (time: any) => {
  const date = new Date(time);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const debounce = (func: any, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const getAccessPoints = (
  user: any,
  label: string,
  viewStock?: boolean
) => {
  // const userPermissions = user?.permissions ?? [];
  let accessPoints: any = userPermissions.filter(
    (e: any) => e.module === label
  );
  if (accessPoints && accessPoints.length > 0)
    accessPoints = accessPoints[0]?.access;
  else accessPoints = {};

  if (viewStock){
    return { ...accessPoints, viewStock: viewStock };}
    else {
    return accessPoints;}
};

export const populateFormFields = (
  fields: any,
  product: any,
  disabledFields?: any
) => {
  return fields.map((field: any) => {
    if (product.hasOwnProperty(field.name))
      return {
        ...field,
        value: product[field.name],
        isDisabled:
          disabledFields && includes(disabledFields, field.name)
            ? true
            : field.isDisabled,
      };
    return field;
  });
};

export const populateFormData = (fields: any, product: any) => {
  const object = {};
  fields.map((field: any) => {
    if (product.hasOwnProperty(field.name)) {
      assign(object, { [field.name]: product[field.name] });
    }
  });
  return object;
};

export const updateFormData = (
  formData: FormData,
  nestedFieldKey: string,
  nestedFields: string[],
  fieldsToRemove: string[]
) => {
  const updatedFormData = new FormData();
  const nestedData: Record<string, any> = {};
  for (const [key, value] of formData.entries()) {
    if (nestedFields.includes(key)) nestedData[key] = value;
    else if (!fieldsToRemove.includes(key)) updatedFormData.append(key, value);
  }
  updatedFormData.append(nestedFieldKey, JSON.stringify(nestedData));
  return updatedFormData;
};

export const getSelectFormattedData = (data: any) => {
  const response = data.map((option: any) => ({
    label: option?._id,
    value: option?.name,
    email: option?.email,
  }));
  return response;
};

export function nestFields(
  obj: Record<string, any>,
  key: string,
  fieldsToNest: string[]
): Record<string, any> {
  const nestedObject: Record<string, any> = {};
  const updatedObject: Record<string, any> = { ...obj };

  fieldsToNest.forEach((field) => {
    if (field in updatedObject) {
      nestedObject[field] = updatedObject[field];
      delete updatedObject[field];
    }
  });
  updatedObject[key] = nestedObject;
  return updatedObject;
}

type NestedObject = {
  [key: string]: any;
};

export function removeSuffixInNestedObject(
  obj: NestedObject,
  nestedKey: string,
  suffix: string
): NestedObject {
  const nestedObj = obj[nestedKey];

  if (!nestedObj || typeof nestedObj !== "object") {
    return obj; // Return the original object if nestedKey is invalid
  }

  const updatedNestedObj = Object.entries(nestedObj).reduce(
    (acc: NestedObject, [key, value]) => {
      const newKey = key.replace(new RegExp(`${suffix}$`), ""); // Remove the suffix
      acc[newKey] = value;
      return acc;
    },
    {}
  );

  return {
    ...obj,
    [nestedKey]: updatedNestedObj, // Update the nested object
  };
}
