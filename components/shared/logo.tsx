import { cn } from "@/utils";
import { ShieldBan } from "lucide-react";

const AppLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <ShieldBan size={32} className="stroke-2 text-primary" />

      <h1 className={cn("glow-text text-primary text-xl")}>STEGANOS_CORE</h1>
    </div>
  );
};

export default AppLogo;
