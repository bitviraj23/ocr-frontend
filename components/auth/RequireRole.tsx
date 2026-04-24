"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthRole } from "@/lib/auth-storage";
import { getAuthState } from "@/lib/auth-storage";

export default function RequireRole({
  allowedRoles,
  redirectTo,
  children,
}: {
  allowedRoles: AuthRole[];
  redirectTo: { whenMissingOrWrong: string };
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { token, role } = getAuthState();
    if (!token || !role || !allowedRoles.includes(role)) {
      router.replace(redirectTo.whenMissingOrWrong);
      return;
    }
    setReady(true);
  }, [allowedRoles, redirectTo.whenMissingOrWrong, router]);

  if (!ready) return null;
  return <>{children}</>;
}

