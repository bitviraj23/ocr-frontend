import AuthShell from "@/components/auth/AuthShell";
import SuperAdminLoginForm from "@/components/auth/SuperAdminLoginForm";

export default function SuperAdminLoginPage() {
  return (
    <AuthShell mode="login" showLeftPanel={false}>
      <SuperAdminLoginForm />
    </AuthShell>
  );
}
