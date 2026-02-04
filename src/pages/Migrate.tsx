import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  FolderOpen, 
  LayoutDashboard, 
  Database, 
  FolderSync,
  Settings2,
  Play,
  Eye,
  AlertCircle
} from "lucide-react";
import { MigrationTypeStep } from "@/components/migration/MigrationTypeStep";
import { SourceSelectionStep } from "@/components/migration/SourceSelectionStep";
import { OptionsStep } from "@/components/migration/OptionsStep";
import { ReviewStep } from "@/components/migration/ReviewStep";
import { MigrationProgress } from "@/components/migration/MigrationProgress";

const steps = [
  { id: 1, title: "Type", desc: "Select migration type" },
  { id: 2, title: "Source", desc: "Choose content" },
  { id: 3, title: "Options", desc: "Configure settings" },
  { id: 4, title: "Review", desc: "Confirm & run" },
];

export type MigrationType = "collection" | "dashboard" | "questions" | "full";
export type ConflictStrategy = "skip" | "overwrite" | "rename";

export interface MigrationConfig {
  type: MigrationType;
  collectionIds: string[];
  includeDashboards: boolean;
  includePermissions: boolean;
  conflictStrategy: ConflictStrategy;
  dryRun: boolean;
}

const Migrate = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [config, setConfig] = useState<MigrationConfig>({
    type: "collection",
    collectionIds: [],
    includeDashboards: true,
    includePermissions: false,
    conflictStrategy: "skip",
    dryRun: true,
  });

  const updateConfig = (updates: Partial<MigrationConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartMigration = () => {
    setIsRunning(true);
  };

  const progress = (currentStep / steps.length) * 100;

  if (isRunning) {
    return <MigrationProgress config={config} onBack={() => setIsRunning(false)} />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-display font-bold">New Migration</h1>
        <p className="text-muted-foreground">
          Follow the steps to migrate your Metabase content
        </p>
      </motion.div>

      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 glass border-border/50">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      currentStep > step.id
                        ? "bg-success text-success-foreground"
                        : currentStep === step.id
                        ? "gradient-primary text-primary-foreground shadow-glow"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">
                      {step.desc}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 md:w-24 h-0.5 mx-2 md:mx-4 transition-colors duration-300 ${
                      currentStep > step.id ? "bg-success" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-1" />
        </Card>
      </motion.div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && (
            <MigrationTypeStep config={config} updateConfig={updateConfig} />
          )}
          {currentStep === 2 && (
            <SourceSelectionStep config={config} updateConfig={updateConfig} />
          )}
          {currentStep === 3 && (
            <OptionsStep config={config} updateConfig={updateConfig} />
          )}
          {currentStep === 4 && (
            <ReviewStep config={config} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between"
      >
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="flex items-center gap-3">
          {currentStep === 4 && (
            <Badge variant="outline" className={config.dryRun ? "bg-warning/10 text-warning border-warning/20" : "bg-success/10 text-success border-success/20"}>
              <Eye className="w-3 h-3 mr-1" />
              {config.dryRun ? "Dry Run Mode" : "Live Mode"}
            </Badge>
          )}
          {currentStep < 4 ? (
            <Button onClick={handleNext} className="gap-2 gradient-primary text-primary-foreground">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleStartMigration} className="gap-2 gradient-primary text-primary-foreground shadow-glow">
              <Play className="w-4 h-4" />
              {config.dryRun ? "Start Dry Run" : "Start Migration"}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Migrate;
