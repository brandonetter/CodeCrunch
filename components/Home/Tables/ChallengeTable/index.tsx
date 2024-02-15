import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AnimateHeight from "@/components/shared/AnimateHeight";
import { ArrowUpDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ButtonSort } from "./ButtonSort";
import CellRender from "./CellRender";
import Link from "next/link";
import React from "react";

interface Props {
  promise?: Promise<any>;
  results?: any;
}
export type Challenge = {
  id: string;
  difficulty: string;
  category: "database" | "frontend" | "backend";
  name: string;
};

export default async function DataTable({ promise, results }: Props) {
  const data = (await promise).data;

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
    <div className="px-4 rounded-b-xl h-fit relative bg-card">
      <Table>
        <TableBody>
          {data.length >= 1 &&
            data.map((row: Challenge) => (
              <TableRow key={row.id}>
                <TableCell
                  key={12}
                  colSpan={3}
                  className="px-0 overflow-hidden bg-card flex relative h-12 items-center"
                >
                  {Object.entries(row).map(([k, v]) => (
                    <CellRender key={v} col={k} row={v} />
                  ))}
                  <div className="absolute right-0 my-2">
                    <Link href={`/challenge/${row.name}`}>
                      <Button variant={"secondary"} className="h-6">
                        View
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          {!data.length && (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
