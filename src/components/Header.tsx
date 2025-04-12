"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "./icons";
import { useUser } from "@/context/UserContext";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const { setUser, user } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/login");
  };
  return (
    <header className="border-b py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-foreground">
          BookSwapr
        </Link>
        <nav>
          <ul className="flex space-x-6 items-center">
            {!user && (
              <>
                <li>
                  <Link href="/#features" className="hover:text-accent">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/#reviews" className="hover:text-accent">
                    Reviews
                  </Link>
                </li>
              </>
            )}

            <li>
              {theme === "light" ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme("dark")}
                >
                  <Icons.dark className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme("light")}
                >
                  <Icons.light className="h-4 w-4" />
                </Button>
              )}
            </li>
            {user ? (
              <li>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </li>
            ) : (
              <>
                <li>
                  <Link href="/login" className="hover:text-accent">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup">
                    <Button variant="outline">Sign Up</Button>
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && user && (
              <li>
                <Link
                  href={
                    user.role === "seeker"
                      ? "/dashboard/seeker"
                      : "/dashboard/owner"
                  }
                >
                  <Button variant="default">Dashboard</Button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
