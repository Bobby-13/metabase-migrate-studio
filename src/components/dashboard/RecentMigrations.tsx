import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertTriangle, Loader2 } from "lucide-react";

const migrations = [
  {
    id: 1,
    name: "Sales Dashboard Collection",
    type: "Collection",
    status: "completed",
    items: "12 dashboards, 48 questions",
    time: "2 hours ago",
  },
  {
    id: 2,
    name: "Marketing Analytics",
    type: "Dashboard",
    status: "in_progress",
    items: "1 dashboard, 8 questions",
    time: "In progress",
  },
  {
    id: 3,
    name: "Finance Reports",
    type: "Collection",
    status: "completed",
    items: "5 dashboards, 24 questions",
    time: "1 day ago",
  },
  {
    id: 4,
    name: "Customer Metrics",
    type: "Questions",
    status: "failed",
    items: "15 questions",
    time: "2 days ago",
  },
  {
    id: 5,
    name: "Executive Summary",
    type: "Dashboard",
    status: "completed",
    items: "1 dashboard, 6 questions",
    time: "3 days ago",
  },
];

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    className: "bg-success/10 text-success border-success/20",
    label: "Completed",
  },
  in_progress: {
    icon: Loader2,
    className: "bg-primary/10 text-primary border-primary/20",
    label: "In Progress",
  },
  failed: {
    icon: AlertTriangle,
    className: "bg-destructive/10 text-destructive border-destructive/20",
    label: "Failed",
  },
};

export function RecentMigrations() {
  return (
    <Card className="glass border-border/50">
      <div className="p-5 border-b border-border/50">
        <h2 className="text-lg font-display font-semibold">Recent Migrations</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Track your migration history and status
        </p>
      </div>
      <div className="divide-y divide-border/50">
        {migrations.map((migration) => {
          const status = statusConfig[migration.status as keyof typeof statusConfig];
          const StatusIcon = status.icon;
          return (
            <div
              key={migration.id}
              className="p-4 hover:bg-muted/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-lg ${status.className}`}>
                    <StatusIcon className={`w-4 h-4 ${migration.status === 'in_progress' ? 'animate-spin' : ''}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">{migration.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {migration.items}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge variant="outline" className="font-normal">
                    {migration.type}
                  </Badge>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {migration.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
