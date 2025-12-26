"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Permission = {
  id: string;
  action: string;
  resource: string;
};

export default function RolePermissionsPage() {
  const params = useParams();
  const roleId = params.roleId as string;

  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/permissions")
      .then((res) => res.json())
      .then(setPermissions);
  }, []);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
    );
  };

  const savePermissions = async () => {
    const res = await fetch(
      `/api/roles/${roleId}/permissions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ permissionIds: selected }),
      }
    );

    if (!res.ok) {
      toast.error("Failed to save permissions");
      return;
    }

    toast.success("Permissions assigned successfully");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Assign Permissions
      </h1>

      <div className="space-y-2">
        {permissions.map((p) => (
          <label
            key={p.id}
            className="flex items-center gap-2"
          >
            <input
              type="checkbox"
              checked={selected.includes(p.id)}
              onChange={() => toggle(p.id)}
            />
            {p.action} : {p.resource}
          </label>
        ))}
      </div>

      <Button className="mt-4" onClick={savePermissions}>
        Save Permissions
      </Button>
    </div>
  );
}
