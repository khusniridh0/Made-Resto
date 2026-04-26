'use client';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { EventContext } from "@/contexts/event-provider";
import { BanknoteArrowUp, ChevronDown, CreditCard, Wallet } from "lucide-react";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dropdown } from "./dropdown";
import { DataContext } from "@/contexts/data-provider";

interface PaymentPanelProps {
    process: () => void
    ClosePanel?: React.ComponentType<{ children: React.ReactNode }>
}

const filterOptions = [
    { label: 'Dine In', value: 'dine in' },
    { label: 'Take It', value: 'take it' },
    { label: 'Delivery', value: 'delivery' },
]

export const PaymentPanel = ({ process, ClosePanel }: PaymentPanelProps) => {
    const [filteredMenus, setFilteredMenus] = useState(filterOptions[0].label);
    const eventContext = useContext(EventContext)
    const dataContext = useContext(DataContext)
    if (!eventContext || !dataContext) { return null }

    const { setShoppingCart } = dataContext
    const filterMenus = (filter: string) => setFilteredMenus(filter)
    const { setEvents } = eventContext

    const handlePayment = () => {
        setEvents({
            play: true,
            title: 'Payment Successful',
            message: 'Your receipt has been sent via email.'
        })
        setShoppingCart([])
        process()
    }

    return (
        <div className="relative h-full">
            <div className="space-y-4 mb-6">
                <h1 className="text-3xl font-bold">Payment</h1>
                <p>3 payment method available</p>
            </div>

            <Separator className="mt-6" />

            <div className="max-h-[calc(100vh-190px)] overflow-y-auto pr-3 py-4">

                <h1 className="text-2xl font-bold mb-6">Payment Method</h1>
                <RadioGroup defaultValue="credit-card" className="flex w-full mb-6">
                    <FieldLabel htmlFor="credit-card" className="relative">
                        <Field orientation="vertical">
                            <FieldContent>
                                <CreditCard className="mx-auto" />
                                <FieldTitle className="mx-auto">Credit Card</FieldTitle>
                            </FieldContent>
                            <RadioGroupItem value="credit-card" id="credit-card" className="absolute max-w-4 max-h-4 top-2 right-2" />
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="paypal" className="relative">
                        <Field orientation="vertical">
                            <FieldContent>
                                <BanknoteArrowUp className="mx-auto" />
                                <FieldTitle className="mx-auto">Paypal</FieldTitle>
                            </FieldContent>
                            <RadioGroupItem value="paypal" id="paypal" className="absolute max-w-4 max-h-4 top-2 right-2" />
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="cash" className="relative">
                        <Field orientation="vertical">
                            <FieldContent>
                                <Wallet className="mx-auto" />
                                <FieldTitle className="mx-auto">Cash</FieldTitle>
                            </FieldContent>
                            <RadioGroupItem value="cash" id="cash" className="absolute max-w-4 max-h-4 top-2 right-2" />
                        </Field>
                    </FieldLabel>
                </RadioGroup>

                <FieldGroup>
                    <Field>
                        <FieldLabel className="text-lg" htmlFor="cardholder-name">Cardholder Name</FieldLabel>
                        <Input id="cardholder-name" type="text" placeholder="Test Programmer" required className="h-12 rounded-lg" />
                    </Field>

                    <Field>
                        <FieldLabel className="text-lg" htmlFor="card-number">Card Number</FieldLabel>
                        <Input id="card-number" type="text" placeholder="2564 1421 0897 1244" required className="h-12 rounded-lg" />
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel className="text-lg" htmlFor="expiration-date">Expiration Date</FieldLabel>
                            <Input id="expiration-date" type="text" placeholder="02/2023" required className="h-12 rounded-lg" />
                        </Field>

                        <Field>
                            <FieldLabel className="text-lg" htmlFor="cvv">CVV</FieldLabel>
                            <Input id="cvv" type="text" placeholder="•••" required className="h-12 rounded-lg" />
                        </Field>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel className="text-lg" htmlFor="table-no">Order Type</FieldLabel>
                            <Dropdown selected={filterMenus} options={filterOptions}>
                                <div className="flex items-center gap-1 w-full justify-between">
                                    <ChevronDown />
                                    <span className="capitalize">
                                        {filteredMenus}
                                    </span>
                                </div>
                            </Dropdown>
                        </Field>

                        <Field>
                            <FieldLabel className="text-lg" htmlFor="table-no">Table no.</FieldLabel>
                            <Input id="table-no" type="text" placeholder="001" required className="h-12 rounded-lg" />
                        </Field>
                    </div>
                </FieldGroup>


            </div>

            <div className="absolute left-0 right-0 bottom-0 z-10 bg-[var(--color-base-dark-2)] grid grid-cols-2 gap-4 pr-3">
                <Button onClick={process} type="button" variant="outline" className="!border-[var(--color-orange-primary)] text-[var(--color-orange-primary)] h-12 w-full font-bold rounded-lg">Cancel</Button>
                {ClosePanel ? <ClosePanel data-slot="drawer-close">
                    <div onClick={handlePayment} role="button" className="border-[var(--color-orange-primary)] bg-[var(--color-orange-primary)] text-white h-12 w-full font-bold rounded-lg flex items-center justify-center">Confirm Payment</div>
                </ClosePanel> :
                    <Button onClick={handlePayment} type="button" className="!border-[var(--color-orange-primary)] bg-[var(--color-orange-primary)] text-white h-12 font-bold rounded-lg">Confirm Payment</Button>
                }
            </div>
        </div>
    );
};



