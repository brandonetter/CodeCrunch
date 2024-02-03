import Pill from "@/components/shared/Pill";

export default function CellRender({ cell, row }: { cell: any; row: any }) {
  return (
    <div className="w-1/3 flex">
      {cell.column.columnDef.id === "name" ? (
        <h2 className="max-sm:text-xs font-bold">{row.getValue("name")}</h2>
      ) : (
        <Pill
          value={
            cell.column.columnDef.id === "difficulty"
              ? row.getValue("difficulty")
              : row.getValue("category")
          }
        ></Pill>
      )}
    </div>
  );
}
