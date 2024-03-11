"use client";
import {
  Column,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { PRODUCTS } from "../data";
import { DeleteIcon } from "lucide-react";
import { UpdateIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TanStackTable = () => {
  // const [data] = useState(() => [...PRODUCTS]);
  const [globalFilter, setGlobalFilter] = useState("");
  const { theme } = useTheme();
  const columnHelper = createColumnHelper();

  const { isFetching, error, data } = useQuery({
    queryKey: ["Products"],
    queryFn: async () => {
      const response = await axios.get("http://127.0.0.1:5000/produit/");
      return response.data;
    },
  });

  const columns: any = [
    columnHelper.accessor("", {
      id: "Numero",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "Numero",
    }),
    columnHelper.accessor("image", {
      cell: (info) => (
        <img
          src={info?.getValue()}
          alt="..."
          className="rounded-full w-10 h-10 object-cover"
        />
      ),
      header: "Image",
    }),
    columnHelper.accessor("nom", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Nom",
    }),
    columnHelper.accessor("price", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Price",
    }),
    columnHelper.accessor("stock", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Stock",
    }),
    columnHelper.accessor("categorie", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Categorie",
    }),
    columnHelper.accessor("rate", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Rate",
    }),
    columnHelper.accessor("date", {
      cell: (info) => {
        const dateValue = info?.getValue();
        const formattedDate = dateValue
          ? new Date(dateValue).toLocaleString()
          : "";
        return <span>{formattedDate}</span>;
      },
      header: "Date",
    }),
    {
      id: "delete",
      accessor: (data: any) => data.id, // assuming you have an 'id' property in your data
      cell: (info: any) => (
        <div className="flex items-center  rounded-full  gap-4">
          <div className="bg-red-400 cursor-pointer hover:scale-110 transition-all p-2 flex items-center gap-2">
            <DeleteIcon color="white" />
            <span className=" font-semibold text-white">Supprimer</span>
          </div>
          <div className="bg-green-400 cursor-pointer hover:scale-110 transition-all p-2 ">
            <Link
              href={`/products/${info.row.original.id}}`}
              className="flex items-center gap-2"
            >
              <UpdateIcon color="white" />
              <span className=" font-semibold text-white">Modifier</span>
            </Link>
          </div>
        </div>
      ),
      header: "Actions",
    },
  ];
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="max-w-[450px] sm:max-w-[470px] md:max-w-[600px] lg:max-w-full  mx-auto  overflow-scroll lg:overflow-hidden ">
      <table className={`border  w-full text-left`}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`capitalize px-3.5 py-2 text-black ${
                    theme !== "light" ? "text-white" : "text-black"
                  }`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => (
              <tr key={row.id} className="text-black">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`px-3.5 py-2 ${
                      theme !== "light" ? "text-white" : "text-black"
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="text-center h-32">
              <td colSpan={12}>No Recoard Found!</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* pagination */}
      <div className="flex items-center justify-end mt-2 gap-2">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className={`p-1 border  border-gray-300 px-2 disabled:opacity-30 ${
            theme !== "light" ? "text-white" : "text-black"
          }`}
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className={`p-1 border  border-gray-300 px-2 disabled:opacity-30 ${
            theme !== "light" ? "text-white" : "text-black"
          }`}
        >
          {">"}
        </button>

        <span className="flex items-center gap-1">
          <div className={`${theme !== "light" ? "text-white" : "text-black"}`}>
            Page
          </div>
          <strong
            className={`${theme !== "light" ? "text-white" : "text-black"}`}
          >
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span
          className={`flex items-center gap-1${
            theme !== "light" ? "text-white" : "text-black"
          }`}
        >
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16 bg-transparent"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-2 bg-transparent"
        >
          {[10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TanStackTable;
