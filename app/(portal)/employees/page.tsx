import EmployeesPageClient from "@/components/portal/EmployeesPageClient";
import RequireRole from "@/components/auth/RequireRole";

export default function EmployeesPage() {
  return (
    <RequireRole allowedRoles={["ADMIN"]} redirectTo={{ whenMissingOrWrong: "/login" }}>
      <EmployeesPageClient />
    </RequireRole>
  );
}
