"use client";

import { tabs } from "@/data/tabs";
import { toast } from "react-toastify";
import { FormEvent, useState } from "react";
import { endpoints } from "@/data/endpoints";
import { Fetch, Post, Put } from "@/hooks/apiUtils";

interface ManageRoleFormProps {
  onClose?: () => void;
  formType: string;
  data?: any;
  setPaginate?: (data: any) => void;
  setFilteredData?: (data: any) => void;
}

const ManageRoleForm: React.FC<ManageRoleFormProps> = ({
  onClose,
  formType,
  data,
  setPaginate,
  setFilteredData,
}) => {
  const [name, setName] = useState(data?.name || "");
  const [description, setDescription] = useState(data?.description || "");
  const [permissions, setPermissions] = useState(
    data?.permissions
      ? tabs.map((tab) => {
          const existingPermission = data.permissions.find(
            (perm: any) => perm.module === tab.permission
          );
          return {
            module: tab.permission,
            access: {
              create: existingPermission?.access.create || false,
              read: existingPermission?.access.read || false,
              update: existingPermission?.access.update || false,
              delete: existingPermission?.access.delete || false,
            },
          };
        })
      : tabs.map((tab) => ({
          module: tab.permission,
          access: {
            create: false,
            read: false,
            update: false,
            delete: false,
          },
        }))
  );

  const handleCheckboxChange = (
    moduleName: string,
    accessType: keyof (typeof permissions)[0]["access"]
  ) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((perm) =>
        perm.module === moduleName
          ? {
              ...perm,
              access: {
                ...perm.access,
                [accessType]: !perm.access[accessType],
              },
            }
          : perm
      )
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const currentEndpoint = endpoints[formType];
      const url = data?._id ? currentEndpoint.update : currentEndpoint.create;

      const payload = {
        name,
        description,
        permissions,
      };

      const resp: any = data?._id
        ? await Put(`${url}${data?._id}`, payload, 5000, true)
        : await Post(url, payload, 5000, true);

      if (resp.success) {
        const response: any = await Fetch(
          currentEndpoint.fetchAll,
          {},
          5000,
          true,
          false
        );
        if (response?.success) {
          setFilteredData?.(response?.data?.result);
          setPaginate?.(response?.data?.pagination);
        } else window.location.reload();
        toast.success("Permissions updated successfully");
      } else {
        toast.error("Failed to update permissions");
      }
    } catch (error) {
      console.error("Failed to update permissions", error);
    } finally {
      onClose?.();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Name</label>
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 border text-black rounded-lg w-full outline-none"
          placeholder="Enter role name"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Description</label>
        <textarea
          rows={1}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 border text-black rounded-lg w-full outline-none"
          placeholder="Enter role description"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-primary text-lg uppercase font-normal text-white">
              <th className="px-4 py-2 text-left rounded-l-lg">Permissions</th>
              <th className="px-4 py-2 text-center">Create</th>
              <th className="px-4 py-2 text-center">Read</th>
              <th className="px-4 py-2 text-center">Update</th>
              <th className="px-4 py-2 text-center rounded-r-lg">Delete</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 font-semibold text-black uppercase">
                  {perm.module}
                </td>
                {Object.keys(perm.access).map((accessType) => (
                  <td key={accessType} className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={
                        perm.access[accessType as keyof typeof perm.access]
                      }
                      onChange={() =>
                        handleCheckboxChange(
                          perm.module,
                          accessType as keyof typeof perm.access
                        )
                      }
                      className="form-checkbox flex items-center justify-center mx-auto w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-start mt-3 space-x-2">
        <button
          type="submit"
          className="py-1 px-3 bg-primary hover:bg-primary/70 text-white rounded-md text-lg"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onClose}
          className="py-1 px-3 bg-red-600 text-white rounded-md text-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ManageRoleForm;
