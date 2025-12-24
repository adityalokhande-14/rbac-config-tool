import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardContent className="p-6">
        <h1 className="text-xl font-bold mb-4">
          RBAC Configuration Tool
        </h1>
        <Button>Shadcn Working</Button>
      </CardContent>
    </Card>
  )
}
