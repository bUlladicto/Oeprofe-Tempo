import { Card, CardContent } from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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
            className={`w-20 h-20 flex items-center justify-center cursor-pointer transition-all ${unlocked ? "bg-gradient-to-br from-amber-100 to-amber-50" : "bg-gray-100 opacity-50"}`}
          >
            <CardContent className="p-0 flex items-center justify-center">
              <div
                className={`text-3xl ${unlocked ? "text-amber-500" : "text-gray-400"}`}
              >
                {icon}
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-1">
            <p className="font-medium">{name}</p>
            <p className="text-xs text-gray-500">{description}</p>
            {unlocked && date && (
              <p className="text-xs text-green-600">Desbloqueado el {date}</p>
            )}
            {!unlocked && <p className="text-xs text-gray-500">Bloqueado</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
