'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SlidersHorizontal } from "lucide-react";
import { useCallback, useState } from "react";
import { Dropdown } from "@/components/custom-ui/dropdown";

interface FilterOption {
    label: string;
    value: string;
}

interface DatatableProps<T> {
    filterOptions: FilterOption[],
    data: T[]
}

export const Datatable = <T extends Record<string, React.ReactNode>>({ filterOptions, data }: DatatableProps<T>) => {
    const [dataShow, setDataShow] = useState<T[]>(data);
    const [filteredOrders, setFilteredOrders] = useState(filterOptions[0].label);

    const sortData = useCallback((sortKey: string) => {
        const sorted = [...data].sort((a, b) => {
            const valA = a[sortKey as keyof T];
            const valB = b[sortKey as keyof T];

            if (typeof valA === 'number' && typeof valB === 'number') {
                return valA - valB;
            }

            return String(valA).localeCompare(String(valB), undefined, { sensitivity: 'base' });
        });

        setDataShow(sorted);
    }, [data]);

    const filterOrders = (filterValue: string) => {
        const selectedOption = filterOptions.find((option) => option.value === filterValue);
        setFilteredOrders(selectedOption?.label ?? filterValue);
        sortData(filterValue);
    };


    return (
        <div className="bg-[var(--color-base-dark-2)] p-6 rounded-xl w-full">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Order Report</h1>
                <Dropdown selected={filterOrders} options={filterOptions}>
                    <div className="flex items-center gap-1 w-full justify-between">
                        <SlidersHorizontal />
                        <span className="capitalize">
                            {filteredOrders}
                        </span>
                    </div>
                </Dropdown>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        {filterOptions.map((item, idx) => (
                            <TableHead key={idx} className="text-lg font-semibold">
                                {item.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dataShow.map((item, idx) => (
                        <TableRow key={idx} className="border-none">
                            {filterOptions.map((option, index) => (
                                <TableCell key={index} className="text-md text-medium">
                                    {item[option.value as keyof T]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}