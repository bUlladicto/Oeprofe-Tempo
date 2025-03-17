import { Card, CardContent } from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";
import { LockIcon } from "lucide-react";

interface AchievementBadgeProps {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  date?: string;
}

export default function AchievementBadge({
  id,
  name,
  description,
  icon,
  unlocked,
  date,
}: AchievementBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className={cn(
              "w-full h-full aspect-square flex flex-col items-center justify-center cursor-pointer transition-all duration-300 border hover:shadow-md",
              unlocked 
                ? "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/30 hover:border-primary/50" 
                : "bg-card/40 border-border/40 opacity-70 hover:opacity-80"
            )}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center gap-2">
              <div className={cn(
                "p-4 rounded-full", 
                unlocked 
                  ? "bg-primary/10" 
                  : "bg-muted"
              )}>
                {unlocked ? icon : <LockIcon className="h-6 w-6 text-muted-foreground" />}
              </div>
              <div className="mt-2">
                <p className={cn(
                  "font-medium text-sm",
                  unlocked ? "text-foreground" : "text-muted-foreground"
                )}>
                  {name}
                </p>
                {unlocked && date && (
                  <p className="text-xs text-primary mt-1">Desbloqueado</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2">
            <p className="font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
            {unlocked && date && (
              <p className="text-xs text-primary">Desbloqueado el {date}</p>
            )}
            {!unlocked && <p className="text-xs text-muted-foreground">Bloqueado</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
