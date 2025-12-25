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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Permissions</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Permission</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Permission</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
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
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Action</th>
            <th className="border p-2">Resource</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.action}</td>
              <td className="border p-2">{p.resource}</td>
              <td className="border p-2">
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
  );
}
