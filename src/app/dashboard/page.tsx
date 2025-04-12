"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function DashboardRouter() {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else if (user.role === "owner") {
      router.replace("/dashboard/owner");
    } else if (user.role === "seeker") {
      router.replace("/dashboard/seeker");
    }
  }, [user]);
  return <div>router</div>;
}

export default DashboardRouter;
