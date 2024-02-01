/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import PageTitle from "@/components/PageTitle";
import Header from "@/components/Header";
import UserModal from "@/components/UserModal";

type Props = {};
type Payment = {
  name: string;
  email: string;
  lastOrder: string;
  active: string;
  method: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <img
            className="h-10 w-10"
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
              "name"
            )}`}
            alt="user-image"
          />
          <p>{row.getValue("name")} </p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "active",
    header: "Active",
  },
  {
    accessorKey: "lastOrder",
    header: "Last Order",
  },
  {
    accessorKey: "method",
    header: "Method",
  },
];

const data: Payment[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    lastOrder: "2023-01-01",
    method: "Credit Card",
    active: "Activer",
  },
];

export default function UsersPage({}: Props) {
  const [toggleModal, setToggleModal] = useState(false);
  const handleToggleModal = () => {
    setToggleModal(!toggleModal);
  };

  const handleClose = () => {
    setToggleModal(false);
  };
  return (
    <div className="flex flex-col gap-5  w-full">
      <Header title="Utilisateur" inputSearch={true} />
      <DataTable columns={columns} data={data} onClick={handleToggleModal} />
      <UserModal toggle={toggleModal} onClose={handleClose} />
    </div>
  );
}
