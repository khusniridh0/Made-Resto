"use client"

import { Home, LogOut, PieChart, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const data = [
    {
        title: "Orders",
        url: "/home",
        icon: Home,
    },
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: PieChart,
    },
    {
        title: "Menu",
        url: "/menu",
        icon: Settings,
    }
]

export const AppSidebar = () => {
    const pathname = usePathname();

    return (
        <div id="container-sidebar" className="sticky top-0 bg-[var(--color-base-dark-2)] flex flex-col p-3 pr-0 gap-4 h-screen rounded-tr-2xl rounded-br-2xl">
            <div id="sidebar-header">
                <div className="flex justify-center items-center bg-amber-500/30 rounded-xl w-[56px] h-[56px] p-3 mx-3 my-4">
                    <Image src="/logo.svg" alt="Logo" width={40} height={40} className="aspect-3/2 object-contain" />
                </div>
            </div>
            <div id="sidebar-content" className="h-full flex flex-col gap-y-4 overflow-x-hidden">
                {data.map((item) => (
                    <Tooltip key={item.title}>
                        <TooltipTrigger>
                            <div
                                className={`p-3 pr-6 rounded-lg rounded-r-none nav-item ${item.url == pathname && 'active bg-[var(--color-base-dark-1)]'}`}
                            >
                                <Link href={item.url} className={`flex justify-center items-center rounded-lg w-[56px] h-[56px] ${item.url == pathname && 'bg-yellow-300'}`} aria-label={item.title}>
                                    <item.icon color={item.url == pathname ? "#FFFFFF" : "var(--color-orange-primary)"} />
                                </Link>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>{item.title}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
            <div id="sidebar-footer" className="p-3 mx-3">
                <Tooltip>
                    <TooltipTrigger>
                        <Link href={'/'}>
                            <LogOut color="var(--color-orange-primary)" aria-label="logout" />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p>Logout</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div >
    );
}