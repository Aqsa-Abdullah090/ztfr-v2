// components/primitives/ProtectedRoute.js
'use client';

import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = Cookies.get("user");

    if (storedUser && pathname === "/login-or-createuser") {
      router.push("/");
    }
  }, [pathname, router]);

  return <>{children}</>;
};

export default ProtectedRoute;