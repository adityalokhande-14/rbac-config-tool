"use client";

import { useEffect, useState } from "react";

type Role = {
  id: string;
  name: string;
  description?: string;
};

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/roles", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) return [];
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRoles(data);
        } else {
          setRoles([]);
        }
      })
      .catch(() => setRoles([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Roles</h1>

      {loading ? (
        <p>Loading...</p>
      ) : roles.length === 0 ? (
        <p className="text-gray-500">No roles found.</p>
      ) : (
        <ul className="space-y-2">
          {roles.map((role) => (
            <li key={role.id} className="border p-3 rounded">
              <a
                href={`/dashboard/roles/${role.id}`}
                className="text-blue-600 font-semibold"
              >
                {role.name}
              </a>
              {role.description && (
                <p className="text-sm text-gray-500">
                  {role.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
