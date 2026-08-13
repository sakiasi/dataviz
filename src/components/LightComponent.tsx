import { Sun } from "lucide-react";
import { useTheme } from "../services/useTheme";

const LightComponent = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div 
      onClick={handleThemeToggle}
      className="fixed bottom-10 right-10 hover:cursor-pointer p-3 rounded-full bg-card border border-border shadow-lg"
    >
      <Sun className="text-primary w-5 h-5" />
    </div>
  );
};

export default LightComponent;