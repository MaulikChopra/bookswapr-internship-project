"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useUser } from "../context/UserContext";

const ProfileDropdown = () => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    // Mock logout logic
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Icons.user className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem
          onClick={() =>
            setTheme((theme) => (theme === "dark" ? "light" : "dark"))
          }
        >
          Toggle Dark Mode <Icons.dark className="ml-2 h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          Log Out <Icons.logout className="ml-2 h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
