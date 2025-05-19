import { Navigation } from "./Navigation";
import ThemeSelector from "./ThemeSelector";

export default function Header() {
  return (
    <div className="flex justify-between border-b-2 border-accent py-2">
      <Navigation />
      <ThemeSelector />
    </div>
  );
}
