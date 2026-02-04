import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Eye, 
  EyeOff,
  Server,
  ArrowRightLeft,
  RefreshCw,
  Trash2
} from "lucide-react";

interface Connection {
  id: string;
  name: string;
  url: string;
  username: string;
  status: "connected" | "disconnected" | "testing";
  type: "source" | "target";
}

const mockConnections: Connection[] = [
  {
    id: "1",
    name: "Production Metabase",
    url: "https://metabase.example.com",
    username: "admin@example.com",
    status: "connected",
    type: "source",
  },
  {
    id: "2",
    name: "Staging Metabase",
    url: "https://staging-metabase.example.com",
    username: "admin@example.com",
    status: "connected",
    type: "target",
  },
];

const Connections = () => {
  const [connections, setConnections] = useState<Connection[]>(mockConnections);
  const [showPassword, setShowPassword] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const testConnection = (id: string) => {
    setConnections((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "testing" as const } : c
      )
    );
    setTimeout(() => {
      setConnections((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, status: "connected" as const } : c
        )
      );
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold">Connections</h1>
          <p className="text-muted-foreground mt-1">
            Configure source and target Metabase instances
          </p>
        </div>
        <Button
          onClick={() => setIsAddingNew(true)}
          className="gap-2 gradient-primary text-primary-foreground"
        >
          <Plus className="w-4 h-4" />
          Add Connection
        </Button>
      </motion.div>

      {/* Connection Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4"
      >
        {connections.map((connection) => (
          <Card key={connection.id} className="p-6 glass border-border/50">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl ${
                    connection.type === "source"
                      ? "bg-primary/10 text-primary"
                      : "bg-success/10 text-success"
                  }`}
                >
                  <Server className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-lg">{connection.name}</h3>
                    <Badge
                      variant="outline"
                      className={
                        connection.type === "source"
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-success/10 text-success border-success/20"
                      }
                    >
                      {connection.type === "source" ? "Source" : "Target"}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        connection.status === "connected"
                          ? "bg-success/10 text-success border-success/20"
                          : connection.status === "testing"
                          ? "bg-warning/10 text-warning border-warning/20"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }
                    >
                      {connection.status === "connected" && (
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                      )}
                      {connection.status === "testing" && (
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      )}
                      {connection.status === "disconnected" && (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      {connection.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {connection.url}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    User: {connection.username}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => testConnection(connection.id)}
                  disabled={connection.status === "testing"}
                  className="gap-2"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${
                      connection.status === "testing" ? "animate-spin" : ""
                    }`}
                  />
                  Test
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      {/* Add New Connection Form */}
      {isAddingNew && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 glass border-border/50">
            <h3 className="font-semibold text-lg mb-6">Add New Connection</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Connection Name</Label>
                  <Input placeholder="My Metabase Instance" />
                </div>
                <div className="space-y-2">
                  <Label>Connection Type</Label>
                  <Tabs defaultValue="source" className="w-full">
                    <TabsList className="w-full">
                      <TabsTrigger value="source" className="flex-1">
                        Source
                      </TabsTrigger>
                      <TabsTrigger value="target" className="flex-1">
                        Target
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Metabase URL</Label>
                <Input placeholder="https://your-metabase.example.com" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Username / Email</Label>
                  <Input placeholder="admin@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <Button className="gradient-primary text-primary-foreground">
                  <Database className="w-4 h-4 mr-2" />
                  Save Connection
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingNew(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Migration Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6 glass border-border/50">
          <h3 className="font-semibold text-lg mb-4">Active Migration Path</h3>
          <div className="flex items-center justify-center gap-6 py-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
                <Database className="w-8 h-8" />
              </div>
              <p className="font-medium">Production</p>
              <p className="text-sm text-muted-foreground">Source</p>
            </div>
            <ArrowRightLeft className="w-8 h-8 text-primary" />
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-success/10 text-success flex items-center justify-center mx-auto mb-2">
                <Database className="w-8 h-8" />
              </div>
              <p className="font-medium">Staging</p>
              <p className="text-sm text-muted-foreground">Target</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Connections;
