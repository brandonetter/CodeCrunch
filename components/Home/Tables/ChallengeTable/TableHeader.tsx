import { TableHeader, TableRow, TableHead, Table } from "@/components/ui/table";

import { Challenge } from ".";
import { ButtonSort } from "./ButtonSort";
import PaginationComponent from "../Pagination";

export default async function DataTable({
  promise,
}: {
  promise: Promise<any>;
}) {
  //   const data = (await promise).data;

  interface ColumnDef<T> {
    accessorKey: keyof T;
    id: string;
    header: React.ReactNode;
  }
  const columns: ColumnDef<Challenge>[] = [
    {
      accessorKey: "name",
      id: "name",
      header: <ButtonSort name="name"></ButtonSort>,
    },
    {
      accessorKey: "difficulty",
      id: "difficulty",
      header: <ButtonSort name="difficulty" />,
    },
    {
      accessorKey: "category",
      id: "category",
      header: <ButtonSort name="category" />,
    },
  ];

  return (
    <div className="px-4 rounded-md border border-b-0 h-fit relative bg-muted/50 hover:bg-muted">
      <Table>
        <TableHeader>
          <TableRow className="flex">
            {columns.map((header, i) => (
              <TableHead
                key={header.id}
                className="w-1/3 flex items-center p-0"
              >
                {header.header}
              </TableHead>
            ))}
            <TableHead>
              <PaginationComponent promise={promise} />
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
}
