"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState } from "react";

export function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onClick() {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={className || "inline-flex items-center gap-1.5 text-sm font-medium text-body transition hover:text-brand-800 disabled:opacity-60"}
    >
      <LogOut className="h-4 w-4" />
      {loading ? "Saindo…" : "Sair"}
    </button>
  );
}
