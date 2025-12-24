"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Permission = {
  id: string;
  action: string;
  resource: string;
};

export default function RolePermissionsPage() {
  const params = useParams();
  const roleId = params.roleId as string;

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

  const assignPermission = async (permissionId: string) => {
    await fetch(`/api/roles/${roleId}/permissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ permissionId }),
    });

    alert("Permission assigned");
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        Assign Permissions
      </h1>

      <ul className="space-y-2">
        {permissions.map((p) => (
          <li
            key={p.id}
            className="flex justify-between border p-2"
          >
            <span>
              {p.action}:{p.resource}
            </span>
            <button
              onClick={() => assignPermission(p.id)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
