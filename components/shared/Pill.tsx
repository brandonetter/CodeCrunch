import { Badge } from "@/components/ui/badge";
export default function Pill({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const colorMap = {
    database: "bg-blue-300 text-blue-800",
    frontend: "bg-green-300 text-green-800",
    backend: "bg-yellow-300 text-yellow-800",
    1: "bg-green-300 text-green-800",
    2: "bg-yellow-300 text-yellow-800",
    3: "bg-red-300 text-red-800",
  };

  const textMap = {
    1: "easy",
    2: "medium",
    3: "hard",
    database: "Database",
    frontend: "Frontend",
    backend: "Backend",
  };
  return (
    <Badge
      className={
        colorMap[value as keyof typeof colorMap] +
        " flex  gap-2 select-none " +
        className
      }
    >
      {textMap[value as keyof typeof textMap]}
      {children}
    </Badge>
  );
}
