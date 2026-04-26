"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Home, LogOut, PieChart, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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

const Logout = () => {
    const router = useRouter();

    const confirm = () => {
        router.push("/");
    }

    return <Dialog>
        <DialogTrigger>
            <LogOut color="var(--color-orange-primary)" aria-label="logout" />
        </DialogTrigger>
        <DialogContent showCloseButton={false} className="flex flex-col items-center bg-white">
            <DialogTitle className="text-2xl font-bold text-center mb-2 text-stone-900">Do you really want to Log Out?</DialogTitle>
            <DialogDescription className="w-full space-y-2">
                <Button onClick={confirm} type="button" className="h-12 bg-[var(--color-orange-primary)] !border-[var(--color-orange-primary)] text-white font-bold rounded-xl text-xl w-full" aria-label="Confirm Logout">Yes</Button>
                <DialogClose asChild>
                    <Button type="button" className="h-12 !border-[var(--color-orange-primary)] bg-transparent hover:bg-transparent text-[var(--color-orange-primary)] font-bold rounded-xl text-xl w-full" aria-label="Cancel Logout">Cancel</Button>
                </DialogClose>
            </DialogDescription>
        </DialogContent>
    </Dialog>
}

export const AppSidebar = () => {
    const pathname = usePathname();

    return (
        <div id="container-sidebar" className="sticky top-0 bg-[var(--color-base-dark-2)] flex flex-col p-2 pr-0 gap-4 h-screen rounded-tr-2xl rounded-br-2xl">
            <div id="sidebar-header">
                <div className="flex justify-center items-center bg-amber-500/30 rounded-xl w-[56px] h-[56px] p-2 sm:p-3 mx-1 sm:mx-3 my-4">
                    <Image src="/logo.svg" alt="Logo" width={40} height={40} sizes="40px" className="aspect-3/2 object-contain" priority={true} />
                </div>
            </div>
            <div id="sidebar-content" className="h-full flex flex-col gap-y-6 overflow-x-hidden py-4">
                {data.map((item) => (
                    <Tooltip key={item.title}>
                        <TooltipTrigger asChild>
                            <div className={`p-2 pr-2 sm:p-3 sm:pr-6 rounded-lg rounded-r-none nav-item ${item.url == pathname && 'active bg-[var(--color-base-dark-1)]'}`} >
                                <Link href={item.url} className={`flex justify-center items-center rounded-lg p-2 w-[54px] h-[54px] ${item.url == pathname && 'bg-yellow-300'}`} aria-label={item.title}>
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
            <div id="sidebar-footer" className="p-2 sm:p-3 mx-3">
                <Logout aria-label="Logout" />
            </div>
        </div >
    );
}