import { getUserBalance } from "@/actions/get-user-balance";
import React from "react";

const Balance = async () => {
  const { balance } = await getUserBalance();
  return (
    <div>
      <h4>Your Balance</h4>
      <p>${balance ?? 0}</p>
    </div>
  );
};

export default Balance;
