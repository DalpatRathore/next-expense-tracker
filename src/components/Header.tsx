import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/nextjs";
import React from "react";
import { Loader2, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { checkUser } from "@/lib/check-user";
import ThemeToggle from "./ThemeToggle";

const Header = async () => {
  // console.log(user);

  return (
    <header className="flex items-center justify-between max-w-7xl mx-auto p-4 border-b">
      <div className="logo">
        <Link href={"/"} className="flex items-center gap-x-3">
          <Image src="/logo.svg" height={60} width={60} alt="logo"></Image>
          <h1 className="hidden md:block text-2xl font-extrabold italic uppercase">
            Next Expense Tracker
          </h1>
        </Link>
      </div>
      <nav className="flex items-center justify-center gap-x-2">
        <ClerkLoading>
          <Loader2 className="w-5 h-5 text-muted-foreground animate-spin"></Loader2>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <Button size={"icon"}>
              <UserButton afterSignOutUrl="/" />
            </Button>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button>
                <LogIn className="w-4 h-4 mr-1"></LogIn>
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>

        <ThemeToggle></ThemeToggle>
      </nav>
    </header>
  );
};

export default Header;
