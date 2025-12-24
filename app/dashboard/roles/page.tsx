"use client";

import { useEffect, useState } from "react";

type Role = {
  id: string;
  name: string;
  description?: string;
};

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    fetch("/api/roles", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then(setRoles);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Roles</h1>

      <ul className="space-y-2">
        {roles.map((role) => (
          <li key={role.id} className="border p-3">
            <a
              href={`/dashboard/roles/${role.id}`}
              className="text-blue-600 font-semibold"
            >
              {role.name}
            </a>
            <p className="text-sm text-gray-500">
              {role.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
