'use client';

import { Drobdown } from "@/components/custom-ui/drobdown";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface OrderedCardProps {
    filterOptions: {
        label: string;
        value: string;
    }[],
    orders: {
        image: string;
        title: string;
        desc: string;
    }[]
}

export const OrderedCard = ({ filterOptions, orders }: OrderedCardProps) => {
    const [data, setData] = useState(orders.slice(0, 3));
    const [isAll, setIsAll] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState(filterOptions[0].label);

    const filterOrders = (filter: string) => setFilteredOrders(filter)
    const allShow = () => {
        if (isAll) {
            setData(orders.slice(0, 3))
        } else {
            setData(orders)
        }

        setIsAll(!isAll);
    }

    return (
        <div className="bg-[var(--color-base-dark-2)] p-6 rounded-xl">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold my-1">Most Ordered</h1>
                <Drobdown selected={filterOrders} options={filterOptions}>
                    <div className="flex items-center gap-1 w-full justify-between">
                        <ChevronDown />
                        <span className="capitalize">
                            {filteredOrders}
                        </span>
                    </div>
                </Drobdown>
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
                Hide
            </Button>
        </div>
    );
}