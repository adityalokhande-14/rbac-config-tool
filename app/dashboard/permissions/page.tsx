"use client";

import { useEffect, useState } from "react";

type Permission = {
  id: string;
  action: string;
  resource: string;
};

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    fetch("/api/permissions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then(setPermissions);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Permissions</h1>

      <table className="border w-full">
        <thead>
          <tr>
            <th className="border p-2">Action</th>
            <th className="border p-2">Resource</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.action}</td>
              <td className="border p-2">{p.resource}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
