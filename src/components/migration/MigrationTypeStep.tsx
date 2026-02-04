import { Card } from "@/components/ui/card";
import { FolderOpen, LayoutDashboard, Database, FolderSync } from "lucide-react";
import type { MigrationConfig, MigrationType } from "@/pages/Migrate";

interface MigrationTypeStepProps {
  config: MigrationConfig;
  updateConfig: (updates: Partial<MigrationConfig>) => void;
}

const migrationTypes: {
  id: MigrationType;
  title: string;
  desc: string;
  icon: typeof FolderOpen;
  details: string[];
}[] = [
  {
    id: "collection",
    title: "Collection",
    desc: "Migrate entire collections with all contents",
    icon: FolderOpen,
    details: [
      "Complete folder hierarchy",
      "All nested sub-collections",
      "Questions and dashboards inside",
    ],
  },
  {
    id: "dashboard",
    title: "Dashboard",
    desc: "Migrate specific dashboards",
    icon: LayoutDashboard,
    details: [
      "Dashboard layout and cards",
      "Filter configurations",
      "Related questions",
    ],
  },
  {
    id: "questions",
    title: "Questions",
    desc: "Migrate individual questions/charts",
    icon: Database,
    details: [
      "Query definitions",
      "Visualization settings",
      "Database references",
    ],
  },
  {
    id: "full",
    title: "Full Sync",
    desc: "Migrate everything from source instance",
    icon: FolderSync,
    details: [
      "All collections",
      "All dashboards and questions",
      "Permissions (optional)",
    ],
  },
];

export function MigrationTypeStep({ config, updateConfig }: MigrationTypeStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-display font-semibold mb-2">
          Select Migration Type
        </h2>
        <p className="text-muted-foreground">
          Choose what type of content you want to migrate
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {migrationTypes.map((type) => (
          <Card
            key={type.id}
            onClick={() => updateConfig({ type: type.id })}
            className={`p-5 cursor-pointer transition-all duration-300 ${
              config.type === type.id
                ? "border-primary bg-primary/5 shadow-glow"
                : "border-border/50 glass hover:border-primary/30"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-xl transition-colors ${
                  config.type === type.id
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <type.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{type.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{type.desc}</p>
                <ul className="space-y-1">
                  {type.details.map((detail, i) => (
                    <li
                      key={i}
                      className="text-xs text-muted-foreground flex items-center gap-2"
                    >
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
