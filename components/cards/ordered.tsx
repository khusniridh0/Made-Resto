'use client';

import { Dropdown } from "@/components/custom-ui/dropdown";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

interface OrderedItem {
    image: string;
    title: string;
    desc: string;
}

interface OrderedCardProps {
    filterOptions: {
        label: string;
        value: string;
    }[],
    orders: OrderedItem[]
}

export const OrderedCard = ({ filterOptions, orders }: OrderedCardProps) => {
    const [data, setData] = useState<OrderedItem[]>(orders.slice(0, 3));
    const [isAll, setIsAll] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState(filterOptions[0].label);

    const filterOrders = useCallback((filter: string) => setFilteredOrders(filter), []);
    const allShow = useCallback(() => {
        setData(!isAll ? orders : orders.slice(0, 3));
        setIsAll(!isAll);
    }, [isAll, orders])

    return (
        <div className="bg-[var(--color-base-dark-2)] p-6 rounded-xl">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold my-1">Most Ordered</h1>
                <Dropdown selected={filterOrders} options={filterOptions}>
                    <div className="flex items-center gap-1 w-full justify-between">
                        <ChevronDown />
                        <span className="capitalize">
                            {filteredOrders}
                        </span>
                    </div>
                </Dropdown>
            </div>

            <Separator className="my-5 bg-[var(--color-dark-line)]" />

            {data.map((item, idx) => (
                <div className="flex mb-6" key={idx}>
                    <Image src={item.image} alt={item.title} width={56} height={56} className="aspect-square object-contain w-14" />
                    <div className="ml-4">
                        <h1 className="text-lg font-medium">{item.title}</h1>
                        <p className="text-sm">{item.desc}</p>
                    </div>
                </div>
            ))}

            <Button variant="outline" size="lg" className="w-full rounded-lg py-6 destructive" onClick={allShow}>
                {isAll ? "Hide" : "Show More"}
            </Button>
        </div>
    );
}