import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4">
        <h2 className="font-bold text-lg mb-4">RBAC Tool</h2>
        <ul className="space-y-2">
          <li>
            <a href="/dashboard/permissions" className="text-blue-600">
              Permissions
            </a>
          </li>
          <li>
            <a href="/dashboard/roles" className="text-blue-600">
              Roles
            </a>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
