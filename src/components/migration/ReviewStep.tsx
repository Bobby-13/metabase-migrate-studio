import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FolderOpen, 
  LayoutDashboard, 
  Shield, 
  SkipForward, 
  RefreshCw, 
  FileEdit,
  Eye,
  ArrowRight,
  Database,
  Check,
  X
} from "lucide-react";
import type { MigrationConfig } from "@/pages/Migrate";

interface ReviewStepProps {
  config: MigrationConfig;
}

const typeLabels = {
  collection: "Collection Migration",
  dashboard: "Dashboard Migration",
  questions: "Questions Migration",
  full: "Full Sync",
};

const strategyIcons = {
  skip: SkipForward,
  overwrite: RefreshCw,
  rename: FileEdit,
};

export function ReviewStep({ config }: ReviewStepProps) {
  const StrategyIcon = strategyIcons[config.conflictStrategy];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-display font-semibold mb-2">
          Review Migration
        </h2>
        <p className="text-muted-foreground">
          Confirm your settings before starting the migration
        </p>
      </div>

      {/* Summary Card */}
      <Card className="p-6 glass border-border/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg">Migration Summary</h3>
          <Badge
            variant="outline"
            className={config.dryRun ? "bg-warning/10 text-warning border-warning/20" : "bg-success/10 text-success border-success/20"}
          >
            <Eye className="w-3 h-3 mr-1" />
            {config.dryRun ? "Dry Run" : "Live Migration"}
          </Badge>
        </div>

        {/* Migration Flow */}
        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Source</p>
              <p className="font-medium">source-metabase.example.com</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-primary" />
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10 text-success">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Target</p>
              <p className="font-medium">target-metabase.example.com</p>
            </div>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-border/50 space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <FolderOpen className="w-4 h-4" />
              <span className="text-sm">Migration Type</span>
            </div>
            <p className="font-medium">{typeLabels[config.type]}</p>
          </div>

          <div className="p-4 rounded-lg border border-border/50 space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <StrategyIcon className="w-4 h-4" />
              <span className="text-sm">Conflict Strategy</span>
            </div>
            <p className="font-medium capitalize">{config.conflictStrategy}</p>
          </div>

          <div className="p-4 rounded-lg border border-border/50 space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <LayoutDashboard className="w-4 h-4" />
              <span className="text-sm">Include Dashboards</span>
            </div>
            <div className="flex items-center gap-2">
              {config.includeDashboards ? (
                <Check className="w-4 h-4 text-success" />
              ) : (
                <X className="w-4 h-4 text-destructive" />
              )}
              <span className="font-medium">
                {config.includeDashboards ? "Yes" : "No"}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border/50 space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Include Permissions</span>
            </div>
            <div className="flex items-center gap-2">
              {config.includePermissions ? (
                <Check className="w-4 h-4 text-success" />
              ) : (
                <X className="w-4 h-4 text-destructive" />
              )}
              <span className="font-medium">
                {config.includePermissions ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>

        {/* Selected Collections */}
        {config.type !== "full" && config.collectionIds.length > 0 && (
          <div className="mt-6 p-4 rounded-lg border border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <FolderOpen className="w-4 h-4" />
              <span className="text-sm">Selected Collections</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {config.collectionIds.map((id) => (
                <Badge key={id} variant="secondary">
                  Collection #{id}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Warning for Live Mode */}
      {!config.dryRun && (
        <Card className="p-4 border-warning/50 bg-warning/5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-warning/10 text-warning">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-warning">Live Migration Mode</p>
              <p className="text-sm text-muted-foreground">
                This will make actual changes to your target Metabase instance.
                Make sure you have a backup before proceeding.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
