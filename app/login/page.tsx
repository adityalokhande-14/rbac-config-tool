"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ Login success
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            RBAC Admin Login
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
  {error && (
    <p className="text-sm text-red-500 text-center">
      {error}
    </p>
  )}

  <Input
    type="email"
    placeholder="Email address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <Input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <Button
    className="w-full"
    onClick={handleLogin}
    disabled={loading}
  >
    {loading ? "Logging in..." : "Login"}
  </Button>

  {/* ✅ Signup link */}
  <p className="text-center text-sm text-muted-foreground">
    Don’t have an account?{" "}
    <a
      href="/signup"
      className="font-medium text-primary hover:underline"
    >
      Sign up
    </a>
  </p>
</CardContent>

      </Card>
    </div>
  );
}
