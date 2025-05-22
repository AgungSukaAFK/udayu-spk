import { useState } from "react";
import { Button } from "./ui/button";
import { Expand, Shrink } from "lucide-react";

type Props = {
  children: React.ReactNode;
  title?: string;
  className?: string;
  id?: string;
};

export default function Section({
  children,
  title = "Section Title",
  className,
  id,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <div
      className={`flex flex-col py-2 px-4 gap-2 rounded-md border border-border w-full`}
      id={id}
    >
      <div className="flex justify-between items-center w-full">
        {title && <p className="font-semibold">{title}</p>}
        <Button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <Shrink /> : <Expand />}
        </Button>
      </div>
      <div className={`${isExpanded ? "block" : "hidden"} ${className}`}>
        {children}
      </div>
    </div>
  );
}
