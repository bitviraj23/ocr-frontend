import OcrWorkspaceClient from "@/components/workspace/OcrWorkspaceClient";
import RequireRole from "@/components/auth/RequireRole";

export default function OcrFilesPage() {
  return (
    <RequireRole
      allowedRoles={["ADMIN", "USER"]}
      redirectTo={{ whenMissingOrWrong: "/login" }}
    >
      <OcrWorkspaceClient />
    </RequireRole>
  );
}
