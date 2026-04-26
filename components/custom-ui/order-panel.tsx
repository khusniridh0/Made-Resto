'use client';

import { OrderProduct } from "@/components/custom-ui/shopping-cart";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { DataContext } from "@/contexts/data-provider";
import { toRupiah } from "@/lib/utils";
import { useContext } from "react";
import { Button } from "../ui/button";
import { Field, FieldContent, FieldLabel, FieldTitle } from "../ui/field";

interface orderPanelProps {
    process: () => void
    isProceess: boolean
}

export const OrderPanel = ({ process, isProceess }: orderPanelProps) => {
    const dataContext = useContext(DataContext)
    if (!dataContext) { return null }

    const { shoppingCarts, setShoppingCart } = dataContext
    const countTotal = shoppingCarts.reduce((total, item) => total + item.subtotal, 0)
    const changeProductDetailById = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const { name, value } = e.target;

        if (name == 'quantity') {
            const newShoppingCarts = shoppingCarts.map((item) => {
                if (item.product_id === id) {
                    return {
                        ...item,
                        quantity: Number(e.target.value),
                        subtotal: Number(e.target.value) * item.detail.price,
                        note: item.note
                    }
                }
                return item
            })
            setShoppingCart(newShoppingCarts)
        }

        if (name == 'note') {
            const newShoppingCarts = shoppingCarts.map((item) => {
                if (item.product_id === id) {
                    return {
                        ...item,
                        note: value
                    }
                }
                return item
            })
            setShoppingCart(newShoppingCarts)
        }
    }

    const removeProductById = (id: number) => {
        const newShoppingCarts = shoppingCarts.filter((item) => item.product_id !== id)
        setShoppingCart(newShoppingCarts)
    }

    return (
        <div className="relative h-full">
            {isProceess ? <div className="space-y-4 mb-6 pr-3">
                <h1 className="text-3xl font-bold">Confirmation</h1>
                <p>Orders #34562</p>
            </div> : <div className="pr-3">
                <h1 className="text-2xl font-bold mb-6">Orders #34562</h1>
                <RadioGroup defaultValue="dinein" className="flex w-full mb-6">
                    <FieldLabel htmlFor="dinein">
                        <Field orientation="horizontal">
                            <FieldContent>
                                <FieldTitle>Dine In</FieldTitle>
                            </FieldContent>
                            <RadioGroupItem value="dinein" id="dinein" />
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="takeit">
                        <Field orientation="horizontal">
                            <FieldContent>
                                <FieldTitle>Take It</FieldTitle>
                            </FieldContent>
                            <RadioGroupItem value="takeit" id="takeit" />
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="delivery">
                        <Field orientation="horizontal">
                            <FieldContent>
                                <FieldTitle>Delivery</FieldTitle>
                            </FieldContent>
                            <RadioGroupItem value="delivery" id="delivery" />
                        </Field>
                    </FieldLabel>
                </RadioGroup>

                <div className="hidden lg:grid grid-cols-9 gap-4">
                    <div className="col-span-4 font-medium">Item</div>
                    <div className="col-span-2 font-medium flex justify-around">Qty</div>
                    <div className="col-span-3 font-medium flex justify-around">Price</div>
                </div>
            </div>}

            <div className="pr-3">
                <Separator className="mt-6 bg-[var(--color-dark-line)] col-span-9" />
            </div>

            <div className="max-h-[calc(100vh-310px)] lg:max-h-[calc(100vh-380px)] overflow-y-auto pr-3 py-4">
                {shoppingCarts.slice().reverse().map((item) => (
                    <OrderProduct products={item} remove={removeProductById} edit={changeProductDetailById} key={item.product_id} />
                ))}
            </div>

            <div className="absolute left-0 right-0 bottom-0 z-10 bg-[var(--color-base-dark-2)] pr-3">
                <Separator className="mb-6 bg-[var(--color-dark-line)]" />
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium">Discount</span>
                    <span className="text-lg font-medium">Rp. 0,-</span>
                </div>
                <div className="flex justify-between items-center mb-8">
                    <span className="text-lg font-medium">Sub total</span>
                    <span className="text-lg font-medium">{toRupiah(countTotal)}</span>
                </div>
                {!isProceess && <Button onClick={process} type="button" disabled={shoppingCarts?.length == 0} className="bg-[var(--color-orange-primary)] text-white w-full h-12 text-lg font-bold rounded-lg">Continue to Payment</Button>}
            </div>
        </div>
    );
};
