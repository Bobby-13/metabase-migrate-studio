import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, FolderOpen, LayoutDashboard, ChevronRight, Database } from "lucide-react";
import type { MigrationConfig } from "@/pages/Migrate";

interface SourceSelectionStepProps {
  config: MigrationConfig;
  updateConfig: (updates: Partial<MigrationConfig>) => void;
}

// Mock data for collections
const mockCollections = [
  { id: "24", name: "Sales Analytics", items: 12, dashboards: 4 },
  { id: "25", name: "Marketing Reports", items: 8, dashboards: 2 },
  { id: "26", name: "Finance Dashboard", items: 15, dashboards: 5 },
  { id: "27", name: "Customer Metrics", items: 20, dashboards: 6 },
  { id: "28", name: "Operations", items: 10, dashboards: 3 },
  { id: "29", name: "Executive Summary", items: 6, dashboards: 2 },
];

export function SourceSelectionStep({ config, updateConfig }: SourceSelectionStepProps) {
  const [search, setSearch] = useState("");

  const filteredCollections = mockCollections.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleCollection = (id: string) => {
    const newIds = config.collectionIds.includes(id)
      ? config.collectionIds.filter((cid) => cid !== id)
      : [...config.collectionIds, id];
    updateConfig({ collectionIds: newIds });
  };

  const selectAll = () => {
    updateConfig({ collectionIds: mockCollections.map((c) => c.id) });
  };

  const clearAll = () => {
    updateConfig({ collectionIds: [] });
  };

  if (config.type === "full") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-display font-semibold mb-2">
            Full Sync Configuration
          </h2>
          <p className="text-muted-foreground">
            All content from the source instance will be migrated
          </p>
        </div>

        <Card className="p-6 glass border-border/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Source Instance</h3>
              <p className="text-sm text-muted-foreground">
                https://source-metabase.example.com
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground mx-4" />
            <div className="p-3 rounded-xl bg-success/10 text-success">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Target Instance</h3>
              <p className="text-sm text-muted-foreground">
                https://target-metabase.example.com
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-display font-bold">156</p>
              <p className="text-sm text-muted-foreground">Collections</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display font-bold">48</p>
              <p className="text-sm text-muted-foreground">Dashboards</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display font-bold">312</p>
              <p className="text-sm text-muted-foreground">Questions</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-display font-semibold mb-2">
          Select Source Content
        </h2>
        <p className="text-muted-foreground">
          Choose the collections you want to migrate
        </p>
      </div>

      <Card className="glass border-border/50">
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search collections..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={selectAll}
                className="text-sm text-primary hover:underline"
              >
                Select all
              </button>
              <span className="text-muted-foreground">|</span>
              <button
                onClick={clearAll}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            </div>
          </div>
          {config.collectionIds.length > 0 && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Selected:</span>
              {config.collectionIds.map((id) => {
                const collection = mockCollections.find((c) => c.id === id);
                return (
                  <Badge
                    key={id}
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                    onClick={() => toggleCollection(id)}
                  >
                    {collection?.name}
                    <span className="ml-1 text-muted-foreground">×</span>
                  </Badge>
                );
              })}
            </div>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto">
          {filteredCollections.map((collection) => (
            <div
              key={collection.id}
              onClick={() => toggleCollection(collection.id)}
              className={`p-4 flex items-center gap-4 cursor-pointer border-b border-border/30 last:border-0 transition-colors ${
                config.collectionIds.includes(collection.id)
                  ? "bg-primary/5"
                  : "hover:bg-muted/30"
              }`}
            >
              <Checkbox
                checked={config.collectionIds.includes(collection.id)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <div className="p-2 rounded-lg bg-muted">
                <FolderOpen className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{collection.name}</p>
                <p className="text-sm text-muted-foreground">
                  {collection.items} items · {collection.dashboards} dashboards
                </p>
              </div>
              <Badge variant="outline" className="font-mono text-xs">
                ID: {collection.id}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
