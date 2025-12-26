"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type Permission = {
  id: string;
  action: string;
  resource: string;
};

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [action, setAction] = useState("");
  const [resource, setResource] = useState("");
  const [open, setOpen] = useState(false);

  const fetchPermissions = async () => {
    const res = await fetch("/api/permissions");
    const data = await res.json();
    setPermissions(data);
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const createPermission = async () => {
    const res = await fetch("/api/permissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, resource }),
    });

    if (!res.ok) {
      toast.error("Failed to create permission");
      return;
    }

    toast.success("Permission created");
    setAction("");
    setResource("");
    setOpen(false);
    fetchPermissions();
  };

  const deletePermission = async (id: string) => {
    const res = await fetch(`/api/permissions/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      toast.error("Delete failed");
      return;
    }

    toast.success("Permission deleted");
    fetchPermissions();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Permissions</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Permission</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Permission</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <Input
                placeholder="Action (e.g. edit)"
                value={action}
                onChange={(e) => setAction(e.target.value)}
              />
              <Input
                placeholder="Resource (e.g. post)"
                value={resource}
                onChange={(e) => setResource(e.target.value)}
              />

              <Button onClick={createPermission} className="w-full">
                Save Permission
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table Card */}
      <div className="rounded-lg border bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-3">Action</th>
              <th className="text-left p-3">Resource</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="text-center text-gray-500 p-6"
                >
                  No permissions created yet
                </td>
              </tr>
            )}

            {permissions.map((p) => (
              <tr
                key={p.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3 font-medium">
                  {p.action}
                </td>
                <td className="p-3">{p.resource}</td>
                <td className="p-3 text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deletePermission(p.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
