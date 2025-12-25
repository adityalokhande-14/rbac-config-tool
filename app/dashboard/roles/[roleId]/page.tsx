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
  const { roleId } = useParams();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all permissions
  useEffect(() => {
    fetch("/api/permissions")
      .then((res) => res.json())
      .then(setPermissions);
  }, []);

  const togglePermission = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
    );
  };

  const savePermissions = async () => {
    setLoading(true);

    const res = await fetch(
      `/api/roles/${roleId}/permissions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ permissionIds: selected }),
      }
    );

    if (res.ok) {
      toast.success("Permissions saved successfully");
    } else {
      toast.error("Failed to save permissions");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Assign Permissions
      </h1>

      <div className="space-y-2 mb-6">
        {permissions.map((p) => (
          <label
            key={p.id}
            className="flex items-center gap-2"
          >
            <input
              type="checkbox"
              checked={selected.includes(p.id)}
              onChange={() => togglePermission(p.id)}
            />
            <span>
              {p.action} : {p.resource}
            </span>
          </label>
        ))}
      </div>

      <Button onClick={savePermissions} disabled={loading}>
        {loading ? "Saving..." : "Save Permissions"}
      </Button>
    </div>
  );
}
