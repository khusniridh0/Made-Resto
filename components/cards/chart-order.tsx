"use client"

import { RadialBar, RadialBarChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Dropdown } from "@/components/custom-ui/dropdown"
import { Separator } from "@/components/ui/separator"
import { ChevronDown } from "lucide-react"
import { useCallback, useState } from "react"

interface OrderedCardProps {
    filterOptions: {
        label: string;
        value: string;
    }[],
}

type ChartItem = {
    title: keyof typeof chartConfig;
    amount: number;
    fill: string;
};

const chartData: ChartItem[] = [
    { title: "pivot", amount: 332, fill: "#262626" },
    { title: "revenue", amount: 200, fill: "#DF8109" },
    { title: "ordered", amount: 122, fill: "#FFA900" },
    { title: "customer", amount: 264, fill: "#FFCF00" }
]

const chartConfig = {
    pivot: { label: "Target" },
    revenue: { label: "Dine In" },
    ordered: { label: "To Go" },
    customer: { label: "Delivery" },
}

export function ChartOrder({ filterOptions }: OrderedCardProps) {
    const [filteredOrders, setFilteredOrders] = useState(filterOptions[0].label);
    const filterOrders = useCallback((filter: string) => setFilteredOrders(filter), [])

    return (
        <div className="bg-[var(--color-base-dark-2)] p-6 rounded-xl h-fit">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-y-4">
                <h1 className="text-2xl font-bold my-1">Most Type of Order</h1>
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

            <div className="mx-auto flex flex-wrap items-center justify-center gap-4">
                <ChartContainer
                    config={chartConfig}
                    className=" aspect-square object-contain min-w-60"
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={450}
                        endAngle={90}
                        innerRadius={30}
                        outerRadius={110}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel nameKey="title" />}
                        />
                        <RadialBar dataKey="amount" background cornerRadius={10} />
                    </RadialBarChart>
                </ChartContainer>

                <div className="w-full flex justify-center items-center gap-2 flex-col sm:flex-row md:w-fit">
                    {chartData.slice(1).map((item, idx) => (
                        <div className="flex items-start gap-2 mb-3" key={idx}>
                            <span style={{ backgroundColor: item.fill }} className="w-4 h-4 aspect-square rounded-full" />
                            <div className="block w-fit h-fit">
                                <small className="leading-none block text-sm">{chartConfig[item.title]?.label}</small>
                                <small className="block whitespace-nowrap">{item.amount} customers</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}