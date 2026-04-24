import CompaniesPageClient from "@/components/admin/CompaniesPageClient";
import RequireRole from "@/components/auth/RequireRole";

export default function CompaniesPage() {
  return (
    <RequireRole
      allowedRoles={["SUPER_ADMIN"]}
      redirectTo={{ whenMissingOrWrong: "/super-admin/login" }}
    >
      <CompaniesPageClient />
    </RequireRole>
  );
}
