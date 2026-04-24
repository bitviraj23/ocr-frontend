import RequireRole from "@/components/auth/RequireRole";
import ApiAccessClient from "@/components/portal/ApiAccessClient";

export default function ApiAccessPage() {
  return (
    <RequireRole
      allowedRoles={["ADMIN"]}
      redirectTo={{ whenMissingOrWrong: "/login" }}
    >
      <ApiAccessClient />
    </RequireRole>
  );
}
