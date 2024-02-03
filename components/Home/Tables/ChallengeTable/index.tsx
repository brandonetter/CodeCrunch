"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";

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
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import CellRender from "./CellRender";
import Link from "next/link";

interface Props {
  promise: Promise<any>;
}
export type Challenge = {
  id: string;
  difficulty: string;
  category: "database" | "frontend" | "backend";
  name: string;
};

export default function DataTable({ promise }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<Challenge[]>([]);
  const [pending, startTransition] = useTransition();
  const params = useSearchParams();
  const router = useRouter();
  const [ascending, setAscending] = useState(params.get("asc") || "");
  const [descending, setDescending] = useState(params.get("desc") || "");
  useEffect(() => {
    async function fetchData() {
      startTransition(async () => {
        const { data } = await promise;
        setData(data as any);
      });
    }

    fetchData();
  }, [promise, startTransition, setData]);

  const toggleSorting = (column: string) => {
    if (ascending === column) {
      setDescending(column);
      setAscending("");
    } else {
      setDescending("");
      setAscending(column);
    }
  };
  useEffect(() => {
    const newParams = new URLSearchParams(params);
    if (ascending) {
      newParams.set("asc", ascending);
    } else {
      newParams.delete("asc");
    }
    if (descending) {
      newParams.set("desc", descending);
    } else {
      newParams.delete("desc");
    }
    router.push(`/?${newParams.toString()}`);
  }, [ascending, descending, params, router]);
  const columns: ColumnDef<Challenge>[] = [
    {
      accessorKey: "name",
      id: "name",
      header: ({ column }) => {
        return (
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => toggleSorting(column.id)}
          >
            Name
            <ArrowUpDown className="h-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "difficulty",
      id: "difficulty",
      header: ({ column }) => {
        return (
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => toggleSorting(column.id)}
          >
            Difficulty
            <ArrowUpDown className="h-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => toggleSorting(column.id)}
          >
            Category
            <ArrowUpDown className="h-4" />
          </Button>
        );
      },
    },
  ];
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="px-4 rounded-md border h-fit relative">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup, i) => (
            <TableRow key={headerGroup.id} className="flex">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="w-1/3 flex items-center p-0"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            <>
              {table.getRowModel().rows.map((row, i) => (
                <TableRow
                  key={row.getValue("name")}
                  data-state={row.getIsSelected() && "selected"}
                >
                  <TableCell
                    key={12}
                    colSpan={3}
                    className="p-0 overflow-hidden"
                  >
                    <Accordion
                      type="single"
                      collapsible
                      className="shadow-blue-500/30 border-blue-500/20 shadow-sm"
                    >
                      <AccordionItem value={row.id}>
                        <AccordionTrigger className="items-start">
                          {row.getVisibleCells().map((cell) => (
                            <CellRender key={cell.id} cell={cell} row={row} />
                          ))}
                        </AccordionTrigger>
                        <AccordionContent className="p-4">
                          {row.getValue("name")}

                          <Link href={`/challenge/${row.getValue("name")}`}>
                            <Button variant={"secondary"}>View</Button>
                          </Link>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div
        className={`${
          !pending && "opacity-0 backdrop-blur-0 pointer-events-none"
        } absolute transition-all duration-200 backdrop-blur-[1px] bg-white/60 top-14 left-0 h-[calc(100%-54px)] w-full`}
      ></div>
    </div>
  );
}
