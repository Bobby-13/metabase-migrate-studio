import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  color: "primary" | "success" | "warning" | "secondary";
}

const colorVariants = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  secondary: "bg-secondary text-secondary-foreground",
};

export function StatusCard({ title, value, icon: Icon, trend, color }: StatusCardProps) {
  return (
    <Card className="p-5 glass border-border/50 hover:border-primary/20 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-display font-bold">{value}</p>
          <p className={cn("text-xs font-medium", colorVariants[color])}>
            {trend}
          </p>
        </div>
        <div className={cn("p-3 rounded-xl", colorVariants[color])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </Card>
  );
}
