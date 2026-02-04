import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Database, FileJson, FolderSync, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    icon: ArrowRightLeft,
    title: "New Migration",
    desc: "Start a new migration",
    href: "/migrate",
    primary: true,
  },
  {
    icon: Database,
    title: "Configure Connections",
    desc: "Set up instances",
    href: "/connections",
    primary: false,
  },
  {
    icon: FileJson,
    title: "Database Mapping",
    desc: "Map database IDs",
    href: "/mapping",
    primary: false,
  },
  {
    icon: Settings,
    title: "Settings",
    desc: "Configure options",
    href: "/settings",
    primary: false,
  },
];

export function QuickActions() {
  return (
    <Card className="glass border-border/50 h-full">
      <div className="p-5 border-b border-border/50">
        <h2 className="text-lg font-display font-semibold">Quick Actions</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Common tasks and shortcuts
        </p>
      </div>
      <div className="p-4 space-y-3">
        {actions.map((action) => (
          <Link key={action.title} to={action.href}>
            <Button
              variant={action.primary ? "default" : "outline"}
              className={`w-full justify-start gap-3 h-auto py-3 px-4 ${
                action.primary
                  ? "gradient-primary text-primary-foreground hover:shadow-glow"
                  : "border-border/50 hover:bg-muted/50"
              }`}
            >
              <action.icon className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">{action.title}</p>
                <p className={`text-xs ${action.primary ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {action.desc}
                </p>
              </div>
            </Button>
          </Link>
        ))}
      </div>
    </Card>
  );
}
