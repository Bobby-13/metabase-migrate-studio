import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Layers, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  Calendar,
  Filter,
  Download,
  Trash2,
  Eye,
  RotateCcw,
  FolderOpen,
  LayoutDashboard,
  Database
} from "lucide-react";

interface Migration {
  id: string;
  name: string;
  type: "collection" | "dashboard" | "questions" | "full";
  status: "completed" | "failed" | "in_progress";
  items: {
    collections: number;
    dashboards: number;
    questions: number;
  };
  date: string;
  duration: string;
  dryRun: boolean;
}

const mockHistory: Migration[] = [
  {
    id: "1",
    name: "Sales Dashboard Collection",
    type: "collection",
    status: "completed",
    items: { collections: 3, dashboards: 12, questions: 48 },
    date: "2024-01-15 10:23:00",
    duration: "2m 34s",
    dryRun: false,
  },
  {
    id: "2",
    name: "Marketing Analytics - Dry Run",
    type: "dashboard",
    status: "completed",
    items: { collections: 1, dashboards: 1, questions: 8 },
    date: "2024-01-15 09:15:00",
    duration: "45s",
    dryRun: true,
  },
  {
    id: "3",
    name: "Full Sync",
    type: "full",
    status: "in_progress",
    items: { collections: 156, dashboards: 48, questions: 312 },
    date: "2024-01-15 08:00:00",
    duration: "-",
    dryRun: false,
  },
  {
    id: "4",
    name: "Finance Reports",
    type: "collection",
    status: "failed",
    items: { collections: 5, dashboards: 24, questions: 96 },
    date: "2024-01-14 16:45:00",
    duration: "1m 12s",
    dryRun: false,
  },
  {
    id: "5",
    name: "Customer Metrics Questions",
    type: "questions",
    status: "completed",
    items: { collections: 1, dashboards: 0, questions: 15 },
    date: "2024-01-14 14:30:00",
    duration: "28s",
    dryRun: false,
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
    icon: XCircle,
    className: "bg-destructive/10 text-destructive border-destructive/20",
    label: "Failed",
  },
};

const typeIcons = {
  collection: FolderOpen,
  dashboard: LayoutDashboard,
  questions: Database,
  full: Layers,
};

const History = () => {
  const [search, setSearch] = useState("");
  const [history] = useState<Migration[]>(mockHistory);

  const filteredHistory = history.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold">Migration History</h1>
          <p className="text-muted-foreground mt-1">
            View and manage past migrations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export All
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-4 glass border-border/50">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search migrations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* History Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="text-left p-4 font-medium text-muted-foreground">Migration</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Type</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Items</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Duration</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredHistory.map((migration) => {
                  const status = statusConfig[migration.status];
                  const StatusIcon = status.icon;
                  const TypeIcon = typeIcons[migration.type];
                  return (
                    <tr
                      key={migration.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-muted">
                            <TypeIcon className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{migration.name}</p>
                            {migration.dryRun && (
                              <Badge variant="outline" className="mt-1 bg-warning/10 text-warning border-warning/20 text-xs">
                                Dry Run
                              </Badge>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="capitalize">
                          {migration.type}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="text-sm space-y-0.5">
                          <p>{migration.items.collections} collections</p>
                          <p className="text-muted-foreground">
                            {migration.items.dashboards} dashboards, {migration.items.questions} questions
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className={status.className}>
                          <StatusIcon className={`w-3 h-3 mr-1 ${migration.status === 'in_progress' ? 'animate-spin' : ''}`} />
                          {status.label}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {migration.date}
                      </td>
                      <td className="p-4 text-sm">
                        {migration.duration}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredHistory.length === 0 && (
            <div className="p-12 text-center">
              <Layers className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-1">No migrations found</h3>
              <p className="text-sm text-muted-foreground">
                {search ? "Try adjusting your search" : "Start your first migration"}
              </p>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default History;
