import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings as SettingsIcon, 
  Shield, 
  Clock, 
  FileJson, 
  Bell,
  Save,
  RotateCcw,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure migration toolkit preferences
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="general" className="gap-2">
              <SettingsIcon className="w-4 h-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="export" className="gap-2">
              <FileJson className="w-4 h-4" />
              Export
            </TabsTrigger>
            <TabsTrigger value="import" className="gap-2">
              <Shield className="w-4 h-4" />
              Import
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="p-6 glass border-border/50 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-1">General Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Basic configuration options
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <Label className="font-medium">Default Dry Run Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable dry run by default for all migrations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <Label className="font-medium">Auto-validate Connections</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically test connections on startup
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <Label className="font-medium">Verbose Logging</Label>
                    <p className="text-sm text-muted-foreground">
                      Show detailed logs during migration
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Export Directory</Label>
                <Input defaultValue="./export_data" className="font-mono" />
                <p className="text-xs text-muted-foreground">
                  Default directory for exported files
                </p>
              </div>
            </Card>

            <Card className="p-6 glass border-border/50 space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">Rate Limiting</h3>
                <p className="text-sm text-muted-foreground">
                  Configure API rate limits to avoid throttling
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Requests per Second</Label>
                  <Input type="number" defaultValue="10" />
                </div>
                <div className="space-y-2">
                  <Label>Retry Attempts</Label>
                  <Input type="number" defaultValue="3" />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Export Settings */}
          <TabsContent value="export" className="space-y-6">
            <Card className="p-6 glass border-border/50 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-1">Export Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Configure default export behavior
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <Label className="font-medium">Include Dashboards</Label>
                    <p className="text-sm text-muted-foreground">
                      Export dashboards by default
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <Label className="font-medium">Include Permissions</Label>
                    <p className="text-sm text-muted-foreground">
                      Export permission groups and settings
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <Label className="font-medium">Include Archived Items</Label>
                    <p className="text-sm text-muted-foreground">
                      Export archived collections and content
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Import Settings */}
          <TabsContent value="import" className="space-y-6">
            <Card className="p-6 glass border-border/50 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-1">Import Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Configure default import behavior
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Conflict Strategy</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {["skip", "overwrite", "rename"].map((strategy) => (
                      <Button
                        key={strategy}
                        variant={strategy === "skip" ? "default" : "outline"}
                        className={strategy === "skip" ? "gradient-primary text-primary-foreground" : ""}
                      >
                        {strategy.charAt(0).toUpperCase() + strategy.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <Label className="font-medium">Apply Permissions</Label>
                    <p className="text-sm text-muted-foreground">
                      Import permissions when available
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <Label className="font-medium">Validate Before Import</Label>
                    <p className="text-sm text-muted-foreground">
                      Run validation checks before importing
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6 glass border-border/50 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-1">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Configure migration notifications
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <div>
                      <Label className="font-medium">Migration Complete</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when migration finishes
                      </p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    <div>
                      <Label className="font-medium">Warnings</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify on non-critical issues
                      </p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-primary" />
                    <div>
                      <Label className="font-medium">Browser Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Show browser notifications
                      </p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Save Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3"
      >
        <Button className="gap-2 gradient-primary text-primary-foreground">
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
        <Button variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset to Defaults
        </Button>
      </motion.div>
    </div>
  );
};

export default Settings;
