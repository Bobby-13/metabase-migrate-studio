import { motion } from "framer-motion";
import { ArrowRightLeft, Database, FolderOpen, LayoutDashboard, CheckCircle2, Clock, AlertTriangle, Play, FileJson, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { RecentMigrations } from "@/components/dashboard/RecentMigrations";
import { QuickActions } from "@/components/dashboard/QuickActions";

const Dashboard = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="absolute inset-0 gradient-primary opacity-10 blur-3xl rounded-3xl" />
        <Card className="relative p-8 glass border-border/50 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 gradient-primary opacity-5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-display font-bold">
                Metabase Migration
                <span className="text-gradient"> Toolkit</span>
              </h1>
              <p className="text-muted-foreground max-w-xl text-lg">
                Seamlessly migrate collections, dashboards, questions, and permissions between Metabase instances with intelligent ID remapping.
              </p>
            </div>
            <Link to="/migrate">
              <Button size="lg" className="gradient-primary text-primary-foreground shadow-glow hover:shadow-lg transition-all duration-300 gap-2">
                <Play className="w-5 h-5" />
                Start Migration
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>

      {/* Status Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatusCard
          title="Total Migrations"
          value="24"
          icon={ArrowRightLeft}
          trend="+3 this week"
          color="primary"
        />
        <StatusCard
          title="Collections"
          value="156"
          icon={FolderOpen}
          trend="Exported"
          color="success"
        />
        <StatusCard
          title="Dashboards"
          value="48"
          icon={LayoutDashboard}
          trend="Migrated"
          color="warning"
        />
        <StatusCard
          title="Questions"
          value="312"
          icon={Database}
          trend="Available"
          color="secondary"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Migrations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <RecentMigrations />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <QuickActions />
        </motion.div>
      </div>

      {/* Capabilities Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-display font-semibold mb-4">What You Can Migrate</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: FolderOpen, title: "Collections", desc: "Complete folder hierarchy and structure" },
            { icon: LayoutDashboard, title: "Dashboards", desc: "Layouts, filters, and all cards" },
            { icon: Database, title: "Questions", desc: "Queries, visualizations, and settings" },
            { icon: Settings2, title: "Permissions", desc: "Groups and access control settings" },
          ].map((item, i) => (
            <Card key={i} className="p-5 glass border-border/50 hover:border-primary/30 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
