import Pill from "@/components/shared/Pill";

export default function CellRender({ col, row }: { col: any; row: any }) {
  if (col === "id" || col === "created_at") return null;
  return (
    <div className="w-1/3 flex">
      {col === "name" ? (
        <h2 className="max-sm:text-xs font-bold">{row}</h2>
      ) : (
        <Pill value={row}></Pill>
      )}
    </div>
  );
}
