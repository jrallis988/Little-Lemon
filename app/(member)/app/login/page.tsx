import { Suspense } from "react";
import { LoginForm } from "@/components/member/login-form";

export default function MemberLoginPage() {
  return (
    <Suspense fallback={<div className="p-4 text-sm text-pf-ink/60">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
