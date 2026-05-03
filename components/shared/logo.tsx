import { ShieldBan } from "lucide-react";

const AppLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <ShieldBan size={35} className="stroke-2 text-primary" />

      <h1 className="glow-text text-primary text-2xl">STEGANOS_CORE</h1>
    </div>
  );
};

export default AppLogo;
