import { SignInButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn } from "lucide-react";

const Guest = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto p-4 space-y-8 h-[75vh]">
      <Card className="w-full max-w-xl space-y-5 p-10">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Welcome to the{" "}
            <span className="uppercase">Next Expense Tracker</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          Please Sign in to manage your transactions
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Button size={"lg"}>
            <LogIn className="w-4 h-4 mr-2"></LogIn>
            <SignInButton></SignInButton>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Guest;
