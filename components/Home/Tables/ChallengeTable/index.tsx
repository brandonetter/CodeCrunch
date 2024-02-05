import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = (await promise).data;

  interface ColumnInstance<T> {
    id: string;
    columnDef: ColumnDef<T>;
  }
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
    <div className="px-4 rounded-md border h-fit relative">
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length >= 1 &&
            data.map((row: Challenge) => (
              <TableRow key={row.id}>
                <TableCell key={12} colSpan={3} className="p-0 overflow-hidden">
                  <Accordion
                    type="single"
                    collapsible
                    className="shadow-blue-500/30 border-blue-500/20 shadow-sm"
                  >
                    <AccordionItem value={row.id}>
                      <AccordionTrigger className="items-start">
                        {Object.entries(row).map(([k, v]) => (
                          <CellRender key={v} col={k} row={v} />
                        ))}
                      </AccordionTrigger>
                      <AccordionContent className="p-4">
                        {row.name}

                        <Link href={`/challenge/${row.name}`}>
                          <Button variant={"secondary"}>View</Button>
                        </Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
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
