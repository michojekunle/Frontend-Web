"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Request = {
	id: string;
	type: string;
	quantity: number;
	location: string;
	status: "Accepted" | "Pending" | "Rejected";
};

export const requests: Request[] = [
	{
		id: "01",
		type: "plastics",
		quantity: 120,
		location: "Wuse, Abuja",
		status: "Pending",
	},
	{
		id: "01",
		type: "plastics",
		quantity: 120,
		location: "Wuse, Abuja",
		status: "Pending",
	},
	{
		id: "01",
		type: "plastics",
		quantity: 120,
		location: "Wuse, Abuja",
		status: "Pending",
	},
];

export const columns: ColumnDef<Request>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "type",
		header: "Type",
	},
	{
		accessorKey: "quantity",
		header: "Quantity",
	},
	{
		accessorKey: "location",
		header: "Location",
	},
	{
		accessorKey: "Status",
		header: () => <div className="text-left">Status</div>,
		cell: ({ row }) => {
			return (
				<div className="text-sm">
					{row.original.status === "Pending" && (
						<div className="flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full px-3 py-1 w-max">
							{/* <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></span> */}
							Pending
						</div>
					)}

					{row.original.status === "Accepted" && (
						<div className="flex items-center justify-center bg-green-100 text-green-600 rounded-full px-3 py-1 w-max">
							{/* <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span> */}
							Verified
						</div>
					)}

					{row.original.status === "Rejected" && (
						<div className="flex items-center justify-center bg-red-100 text-red-600 rounded-full px-3 py-1 w-max">
							{/* <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span> */}
							Failed
						</div>
					)}
				</div>
			);
		},
	},
];

// const dataTable = () => {
// 	return <div>dataTable</div>;
// };

// export default dataTable;

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}

export default function DataTableColumn() {
	return (
		<div className="container mx-auto py-10">
			<DataTable
				columns={columns}
				data={requests}
			/>
		</div>
	);
}
