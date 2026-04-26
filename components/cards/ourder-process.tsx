'use client'

import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { OrderPanel } from "../custom-ui/order-panel";
import { PaymentPanel } from "../custom-ui/payment-panel";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Separator } from "../ui/separator";
import { ShoppingCart } from "lucide-react";

const DesktopVersion = ({ isProceess, isRequest }: { isProceess: boolean, isRequest: () => void }) => {
    return (
        <div className={`absolute top-0 right-0 bg-[var(--color-base-dark-2)] h-screen flex rounded-l-2xl -translate-y-6 translate-x-6 overflow-hidden ${isProceess ? 'w-[calc(100%*2)]' : 'w-full'}`}>
            <div className={`grid grid-col-1 p-6 h-full ${isProceess ? 'w-[calc(100%/2)]' : 'w-full'}`}>
                <OrderPanel process={isRequest} isProceess={isProceess} />
            </div>
            {isProceess && <>
                <Separator orientation="vertical" />
                <div className="grid grid-col-1 p-6 h-full w-[calc(100%/2)]">
                    <PaymentPanel process={isRequest} />
                </div>
            </>}
        </div>
    )
}

const MobileVersion = ({ isProceess, isRequest }: { isProceess: boolean, isRequest: () => void }) => {
    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button size="icon" className="!border-[var(--color-orange-primary)] bg-[var(--color-orange-primary)] rounded-full fixed bottom-5 left-1/2 -translate-x-1/2">
                    <ShoppingCart />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-[var(--color-base-dark-2)] p-4 pr-0">
                <DrawerHeader className="hidden">
                    <DrawerTitle />
                </DrawerHeader>
                {isProceess ? <PaymentPanel process={isRequest} ClosePanel={DrawerClose} /> : <OrderPanel process={isRequest} isProceess={isProceess} />}
            </DrawerContent>
        </Drawer>
    )
}

const OrderProcess = () => {
    const [paymentProcess, setPaymentProcess] = useState(false)
    const [isHydrated, setIsHydrated] = useState(false);
    const isMobile = useIsMobile();
    const paymentRequest = () => {
        setPaymentProcess(!paymentProcess)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsHydrated(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    return isHydrated ? isMobile ? < MobileVersion isProceess={paymentProcess} isRequest={paymentRequest} /> : <DesktopVersion isProceess={paymentProcess} isRequest={paymentRequest} /> : ''
}

export default OrderProcess;