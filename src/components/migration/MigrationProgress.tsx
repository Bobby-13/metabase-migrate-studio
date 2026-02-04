import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  FolderOpen,
  LayoutDashboard,
  Database,
  Shield,
  FileJson,
  Terminal
} from "lucide-react";
import type { MigrationConfig } from "@/pages/Migrate";

interface MigrationProgressProps {
  config: MigrationConfig;
  onBack: () => void;
}

interface LogEntry {
  timestamp: string;
  level: "info" | "success" | "warning" | "error";
  message: string;
}

const mockLogs: LogEntry[] = [
  { timestamp: "10:23:01", level: "info", message: "Starting migration process..." },
  { timestamp: "10:23:02", level: "info", message: "Authenticating with source instance..." },
  { timestamp: "10:23:03", level: "success", message: "Successfully authenticated with source" },
  { timestamp: "10:23:04", level: "info", message: "Authenticating with target instance..." },
  { timestamp: "10:23:05", level: "success", message: "Successfully authenticated with target" },
  { timestamp: "10:23:06", level: "info", message: "Loading database mapping from db_map.json..." },
  { timestamp: "10:23:07", level: "success", message: "Database mapping validated: 3 databases mapped" },
  { timestamp: "10:23:08", level: "info", message: "Fetching collections from source..." },
  { timestamp: "10:23:10", level: "info", message: "Found 6 collections to migrate" },
  { timestamp: "10:23:11", level: "info", message: "Exporting collection: Sales Analytics (ID: 24)" },
  { timestamp: "10:23:13", level: "success", message: "Exported 12 questions from Sales Analytics" },
  { timestamp: "10:23:14", level: "info", message: "Exporting dashboards for Sales Analytics..." },
  { timestamp: "10:23:16", level: "success", message: "Exported 4 dashboards" },
  { timestamp: "10:23:17", level: "info", message: "Importing collection: Sales Analytics..." },
  { timestamp: "10:23:18", level: "info", message: "Remapping database IDs in queries..." },
  { timestamp: "10:23:20", level: "success", message: "Created collection Sales Analytics (new ID: 156)" },
  { timestamp: "10:23:21", level: "info", message: "Importing 12 questions..." },
  { timestamp: "10:23:25", level: "success", message: "Successfully imported 12 questions" },
  { timestamp: "10:23:26", level: "warning", message: "Question 'Revenue Chart' - remapped table_id: 42 → 78" },
  { timestamp: "10:23:27", level: "info", message: "Importing 4 dashboards..." },
  { timestamp: "10:23:30", level: "success", message: "Successfully imported 4 dashboards" },
];

export function MigrationProgress({ config, onBack }: MigrationProgressProps) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [status, setStatus] = useState<"running" | "completed" | "failed">("running");

  useEffect(() => {
    // Simulate migration progress
    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < mockLogs.length) {
        setLogs((prev) => [...prev, mockLogs[logIndex]]);
        setProgress(((logIndex + 1) / mockLogs.length) * 100);
        logIndex++;
      } else {
        setStatus("completed");
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const getLogColor = (level: LogEntry["level"]) => {
    switch (level) {
      case "success":
        return "text-success";
      case "warning":
        return "text-warning";
      case "error":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const stats = [
    { label: "Collections", value: "6", icon: FolderOpen },
    { label: "Dashboards", value: "4", icon: LayoutDashboard },
    { label: "Questions", value: "12", icon: Database },
    { label: "Permissions", value: config.includePermissions ? "Yes" : "No", icon: Shield },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-display font-bold">
            {status === "running" && "Migration in Progress"}
            {status === "completed" && "Migration Complete"}
            {status === "failed" && "Migration Failed"}
          </h1>
          {status === "running" && (
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          )}
          {status === "completed" && (
            <CheckCircle2 className="w-6 h-6 text-success" />
          )}
          {status === "failed" && (
            <XCircle className="w-6 h-6 text-destructive" />
          )}
        </div>
        <p className="text-muted-foreground">
          {config.dryRun ? "Dry run - no changes are being made" : "Live migration in progress"}
        </p>
      </motion.div>

      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 glass border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={
                  status === "running"
                    ? "bg-primary/10 text-primary border-primary/20"
                    : status === "completed"
                    ? "bg-success/10 text-success border-success/20"
                    : "bg-destructive/10 text-destructive border-destructive/20"
                }
              >
                {status === "running" && "Processing"}
                {status === "completed" && "Completed"}
                {status === "failed" && "Failed"}
              </Badge>
              {config.dryRun && (
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                  Dry Run
                </Badge>
              )}
            </div>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-3 rounded-lg bg-muted/30"
              >
                <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                <p className="text-lg font-semibold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Logs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass border-border/50">
          <div className="p-4 border-b border-border/50 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            <h3 className="font-semibold">Migration Logs</h3>
          </div>
          <ScrollArea className="h-80">
            <div className="p-4 font-mono text-sm space-y-1">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-muted-foreground shrink-0">
                    [{log.timestamp}]
                  </span>
                  <span className={getLogColor(log.level)}>{log.message}</span>
                </motion.div>
              ))}
              {status === "running" && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Processing...</span>
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between"
      >
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          {status === "completed" ? "New Migration" : "Cancel"}
        </Button>

        {status === "completed" && (
          <Button className="gap-2 gradient-primary text-primary-foreground">
            <FileJson className="w-4 h-4" />
            Download Report
          </Button>
        )}
      </motion.div>
    </div>
  );
}
