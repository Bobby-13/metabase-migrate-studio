import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  FileJson, 
  Plus, 
  Trash2, 
  ArrowRight, 
  CheckCircle2,
  Upload,
  Download,
  Database,
  Table
} from "lucide-react";

interface DatabaseMapping {
  sourceId: string;
  sourceName: string;
  targetId: string;
  targetName: string;
  tables: number;
}

const mockMappings: DatabaseMapping[] = [
  { sourceId: "1", sourceName: "Production DB", targetId: "5", targetName: "Staging DB", tables: 24 },
  { sourceId: "2", sourceName: "Analytics DW", targetId: "6", targetName: "Analytics Staging", tables: 18 },
  { sourceId: "3", sourceName: "Customer Data", targetId: "7", targetName: "Customer Staging", tables: 12 },
];

const Mapping = () => {
  const [mappings, setMappings] = useState<DatabaseMapping[]>(mockMappings);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const removeMapping = (sourceId: string) => {
    setMappings((prev) => prev.filter((m) => m.sourceId !== sourceId));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold">Database Mapping</h1>
          <p className="text-muted-foreground mt-1">
            Map source database IDs to target database IDs
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Import JSON
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-5 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Critical Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Database mapping is essential for successful migration. It maps source database IDs to target database IDs, 
                ensuring all queries and references are correctly remapped during import.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Mappings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass border-border/50">
          <div className="p-5 border-b border-border/50 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Current Mappings</h2>
              <p className="text-sm text-muted-foreground">
                {mappings.length} database mappings configured
              </p>
            </div>
            <Button
              onClick={() => setIsAddingNew(true)}
              size="sm"
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Mapping
            </Button>
          </div>

          <div className="divide-y divide-border/50">
            {mappings.map((mapping) => (
              <div
                key={mapping.sourceId}
                className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors"
              >
                {/* Source */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="font-mono text-xs">
                      ID: {mapping.sourceId}
                    </Badge>
                    <span className="text-sm text-muted-foreground">Source</span>
                  </div>
                  <p className="font-medium">{mapping.sourceName}</p>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-2 px-4">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>

                {/* Target */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="font-mono text-xs bg-success/10 text-success border-success/20">
                      ID: {mapping.targetId}
                    </Badge>
                    <span className="text-sm text-muted-foreground">Target</span>
                  </div>
                  <p className="font-medium">{mapping.targetName}</p>
                </div>

                {/* Tables Count */}
                <div className="flex items-center gap-2 px-4">
                  <Table className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {mapping.tables} tables
                  </span>
                </div>

                {/* Status */}
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Validated
                </Badge>

                {/* Actions */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMapping(mapping.sourceId)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {mappings.length === 0 && (
            <div className="p-12 text-center">
              <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-1">No mappings configured</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add database mappings to enable migration
              </p>
              <Button onClick={() => setIsAddingNew(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Your First Mapping
              </Button>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Add New Mapping */}
      {isAddingNew && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 glass border-border/50">
            <h3 className="font-semibold text-lg mb-6">Add Database Mapping</h3>
            <div className="grid grid-cols-2 gap-6">
              {/* Source */}
              <div className="space-y-4 p-4 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 text-primary">
                  <Database className="w-5 h-5" />
                  <h4 className="font-medium">Source Database</h4>
                </div>
                <div className="space-y-2">
                  <Label>Database ID</Label>
                  <Input placeholder="e.g., 1" className="font-mono" />
                </div>
                <div className="space-y-2">
                  <Label>Database Name (optional)</Label>
                  <Input placeholder="e.g., Production DB" />
                </div>
              </div>

              {/* Target */}
              <div className="space-y-4 p-4 rounded-lg border border-success/20 bg-success/5">
                <div className="flex items-center gap-2 text-success">
                  <Database className="w-5 h-5" />
                  <h4 className="font-medium">Target Database</h4>
                </div>
                <div className="space-y-2">
                  <Label>Database ID</Label>
                  <Input placeholder="e.g., 5" className="font-mono" />
                </div>
                <div className="space-y-2">
                  <Label>Database Name (optional)</Label>
                  <Input placeholder="e.g., Staging DB" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <Button className="gradient-primary text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Add Mapping
              </Button>
              <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                Cancel
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* JSON Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6 glass border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">db_map.json Preview</h3>
            <Badge variant="outline" className="font-mono text-xs">
              <FileJson className="w-3 h-3 mr-1" />
              JSON
            </Badge>
          </div>
          <pre className="p-4 rounded-lg bg-background/50 font-mono text-sm overflow-x-auto">
            {JSON.stringify(
              Object.fromEntries(
                mappings.map((m) => [m.sourceId, parseInt(m.targetId)])
              ),
              null,
              2
            )}
          </pre>
        </Card>
      </motion.div>
    </div>
  );
};

export default Mapping;
