import { Sun } from "lucide-react";
import { useTheme } from "../services/useTheme";
import useScrollDirection from "../services/useScrollDirection";

const LightComponent = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const scrollDirection = useScrollDirection();

  if(scrollDirection === 'down') return

  return (
    <div
      onClick={handleThemeToggle}
      className="fixed bottom-10 right-10 hover:cursor-pointer p-3 rounded-full bg-card border border-border shadow-lg"
    >
      <Sun className=" hover:text-accent-foreground text-primary w-5 h-5" />
    </div>
  );
};

export default LightComponent;
