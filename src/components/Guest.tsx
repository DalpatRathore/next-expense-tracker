import { SignInButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";

const Guest = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto p-4 space-y-8 h-full">
      <h1>Welcome to the Next Expense Tracker</h1>
      <p>Please sign in to manage your transactions</p>
      <Button>
        <SignInButton></SignInButton>
      </Button>
    </div>
  );
};

export default Guest;
