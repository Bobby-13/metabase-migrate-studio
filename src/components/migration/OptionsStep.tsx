import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Shield, 
  Eye, 
  SkipForward, 
  RefreshCw, 
  FileEdit,
  AlertCircle,
  Info
} from "lucide-react";
import type { MigrationConfig, ConflictStrategy } from "@/pages/Migrate";

interface OptionsStepProps {
  config: MigrationConfig;
  updateConfig: (updates: Partial<MigrationConfig>) => void;
}

const conflictStrategies: {
  id: ConflictStrategy;
  title: string;
  desc: string;
  icon: typeof SkipForward;
}[] = [
  {
    id: "skip",
    title: "Skip",
    desc: "Skip items that already exist (safest)",
    icon: SkipForward,
  },
  {
    id: "overwrite",
    title: "Overwrite",
    desc: "Update existing items with new data",
    icon: RefreshCw,
  },
  {
    id: "rename",
    title: "Rename",
    desc: "Create new items with modified names",
    icon: FileEdit,
  },
];

export function OptionsStep({ config, updateConfig }: OptionsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-display font-semibold mb-2">
          Migration Options
        </h2>
        <p className="text-muted-foreground">
          Configure how the migration should behave
        </p>
      </div>

      {/* Include Options */}
      <Card className="p-6 glass border-border/50 space-y-6">
        <h3 className="font-semibold flex items-center gap-2">
          <Info className="w-4 h-4 text-primary" />
          Include Options
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <Label className="font-medium">Include Dashboards</Label>
                <p className="text-sm text-muted-foreground">
                  Export and import all dashboards in selected collections
                </p>
              </div>
            </div>
            <Switch
              checked={config.includeDashboards}
              onCheckedChange={(checked) =>
                updateConfig({ includeDashboards: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10 text-warning">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <Label className="font-medium">Include Permissions</Label>
                <p className="text-sm text-muted-foreground">
                  Migrate permission groups and access settings
                </p>
              </div>
            </div>
            <Switch
              checked={config.includePermissions}
              onCheckedChange={(checked) =>
                updateConfig({ includePermissions: checked })
              }
            />
          </div>
        </div>
      </Card>

      {/* Conflict Resolution */}
      <Card className="p-6 glass border-border/50 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-warning" />
          Conflict Resolution
        </h3>
        <p className="text-sm text-muted-foreground">
          How to handle items that already exist in the target instance
        </p>

        <RadioGroup
          value={config.conflictStrategy}
          onValueChange={(value: ConflictStrategy) =>
            updateConfig({ conflictStrategy: value })
          }
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {conflictStrategies.map((strategy) => (
            <Label
              key={strategy.id}
              htmlFor={strategy.id}
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                config.conflictStrategy === strategy.id
                  ? "border-primary bg-primary/5"
                  : "border-border/50 hover:border-primary/30"
              }`}
            >
              <RadioGroupItem value={strategy.id} id={strategy.id} />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <strategy.icon className="w-4 h-4 text-primary" />
                  <span className="font-medium">{strategy.title}</span>
                </div>
                <p className="text-xs text-muted-foreground">{strategy.desc}</p>
              </div>
            </Label>
          ))}
        </RadioGroup>
      </Card>

      {/* Dry Run Option */}
      <Card className="p-6 glass border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${config.dryRun ? "bg-warning/10 text-warning" : "bg-success/10 text-success"}`}>
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <Label className="font-medium flex items-center gap-2">
                Dry Run Mode
                {config.dryRun && (
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 text-xs">
                    Recommended
                  </Badge>
                )}
              </Label>
              <p className="text-sm text-muted-foreground">
                Preview changes without actually migrating data
              </p>
            </div>
          </div>
          <Switch
            checked={config.dryRun}
            onCheckedChange={(checked) => updateConfig({ dryRun: checked })}
          />
        </div>
      </Card>
    </div>
  );
}
