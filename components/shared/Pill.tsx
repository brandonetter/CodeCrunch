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
    database: "bg-blue-100 text-blue-800",
    frontend: "bg-green-100 text-green-800",
    backend: "bg-yellow-100 text-yellow-800",
    1: "bg-green-100 text-green-800",
    2: "bg-yellow-100 text-yellow-800",
    3: "bg-red-100 text-red-800",
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
