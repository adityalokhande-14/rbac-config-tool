import { prisma } from "@/lib/prisma";

export async function hasPermission(
  userId: string,
  action: string,
  resource: string
): Promise<boolean> {
  const roles = await prisma.userRole.findMany({
    where: { userId },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  for (const userRole of roles) {
    for (const rolePermission of userRole.role.permissions) {
      if (
        rolePermission.permission.action === action &&
        rolePermission.permission.resource === resource
      ) {
        return true;
      }
    }
  }

  return false;
}
