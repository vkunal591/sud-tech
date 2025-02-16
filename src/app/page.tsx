"use client";
import AuthGuard from "@/components/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
    </AuthGuard>
  );
}
