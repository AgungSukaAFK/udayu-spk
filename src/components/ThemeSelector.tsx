import { useTheme, type Theme } from "@/hooks/useTheme";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const themes = [
    "light",
    "dark",
    "rose",
    "dark-rose",
    "blue",
    "dark-blue",
    "green",
    "dark-green",
  ] as Theme[];

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder={theme} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cerah</SelectLabel>
          {themes.map(
            (t) =>
              !t.startsWith("dark") && (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              )
          )}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Gelap</SelectLabel>
          {themes.map(
            (t) =>
              t.startsWith("dark") && (
                <SelectItem key={t} value={t}>
                  {t.split("-")[1] || t}
                </SelectItem>
              )
          )}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Lainnya</SelectLabel>
          <SelectItem value={"system"}>Default</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
