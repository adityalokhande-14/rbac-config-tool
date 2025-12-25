import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ FIX: await cookies()
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6 text-center">
            RBAC Tool
          </h2>

          <nav className="space-y-3">
            <Link
              href="/dashboard/permissions"
              className="block rounded px-3 py-2 text-sm font-medium hover:bg-gray-100"
            >
              Permissions
            </Link>

            <Link
              href="/dashboard/roles"
              className="block rounded px-3 py-2 text-sm font-medium hover:bg-gray-100"
            >
              Roles
            </Link>
          </nav>
        </div>

        {/* Logout */}
        <form action="/api/auth/logout" method="POST">
          <Button variant="destructive" className="w-full">
            Logout
          </Button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
