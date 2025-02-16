"use client";

import { Fetch } from "@/hooks/apiUtils";
import { useCallback, useEffect, useState } from "react";
import { format12Hour, formatDate } from "@/hooks/general";

const UserData = () => {
  const [limit, setLimit] = useState(5);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const fetchAPI = useCallback(async () => {
    try {
      setLoading(true);
      setUsers([]);
      setTransactions([]);
      const { data, success }: any = await Fetch(
        `admin/dashboard/overview?limit=${limit}`,
        {},
        5000,
        true,
        false
      );
      if (success) {
        setUsers(data.users);
        setTransactions(data.transactions);
      }
    } catch (error) {
      console.log("Console error: " + error);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  return (
    <>
      <div className="pt-6">
        <div className="flex justify-between items-center gap-5 pb-5">
          <h4 className="text-2xl font-bold">Latest Updates</h4>
          <select
            value={limit}
            disabled={loading}
            onChange={(e) => setLimit(parseInt(e.target.value))}
            className={`border border-primary focus:ring-2 focus:ring-primary outline-none rounded-lg px-6 text-base py-2 font-medium`}
          >
            <option value="">--Select Limit--</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-5 mb-5">
          {users && users.length > 0 && (
            <div className="bg-primary/10 shadow rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">User Details</h3>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-white bg-primary">
                    <th className="py-2 w-1/5 text-xs pl-2 rounded-tl-lg">
                      ID
                    </th>
                    <th className="py-2 w-1/5 text-xs pl-2">Name</th>
                    <th className="py-2 w-1/5 text-xs pl-2">Role</th>
                    <th className="py-2 w-1/5 text-xs pl-2">Email ID</th>
                    <th className="py-2 w-1/5 text-xs pl-2 rounded-tr-lg">
                      Phone Number
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user: any) => {
                    return (
                      <tr key={user?._id} className="border-b bg-white">
                        <td className="py-2 w-1/5 text-xs pl-2">{user?._id}</td>
                        <td className="py-2 w-1/5 text-xs pl-2 capitalize">
                          {user?.name}
                        </td>
                        <td className="py-2 w-1/5 text-xs pl-2 capitalize">
                          {user?.role}
                        </td>
                        <td className="py-2 w-1/5 text-xs pl-2">
                          {user?.email}
                        </td>
                        <td className="py-2 w-1/5 text-xs pl-2">
                          {user?.mobile}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {transactions && transactions.length > 0 && (
            <div className="bg-primary/10 shadow rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">
                Successful Transactions
              </h3>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-white bg-primary">
                    <th className="py-2 w-1/4 text-xs pl-2 rounded-tl-lg">
                      Transaction ID
                    </th>
                    <th className="py-2 w-1/4 text-xs pl-2">User Name</th>
                    <th className="py-2 w-1/4 text-xs pl-2">Amount</th>
                    <th className="py-2 w-1/4 text-xs pl-2 rounded-tr-lg">
                      Date / Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction: any) => {
                    return (
                      <tr key={transaction?._id} className="border-b bg-white">
                        <td className="py-2 w-1/4 text-xs pl-2">
                          {transaction?.transactionId}
                        </td>
                        <td className="py-2 w-1/4 text-xs pl-2 capitalize">
                          {transaction?.userName}
                        </td>
                        <td className="py-2 w-1/4 text-xs pl-2">
                          {transaction?.amount > 0 &&
                            `₹ ${transaction?.amount}`}
                        </td>
                        <td className="py-2 w-1/4 text-xs pl-2">
                          {formatDate(transaction?.createdAt)},{" "}
                          {format12Hour(transaction?.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserData;
