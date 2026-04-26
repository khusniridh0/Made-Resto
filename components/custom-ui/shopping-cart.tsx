import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toRupiah } from "@/lib/utils";
import { ShoppingCart } from "@/types";
import { Trash } from "lucide-react";
import Image from "next/image";

interface Props {
    products: ShoppingCart
    remove: (id: number) => void
    edit: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void
}

export const OrderProduct = ({ products, remove, edit }: Props) => {
    if (!products) return null

    const { product_id, detail, quantity, note } = products
    const { image, name, price, stock } = detail

    const hendleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        edit(e, product_id)
    }

    const returnAction = () => {
        remove(product_id)
    }

    return (
        <div className="grid grid-cols-9 gap-2">
            <div className="lg:col-span-4 col-span-9">
                <div className="grid lg:grid-cols-4 grid-cols-5">
                    <div className="col-span-1">
                        <Image src={image} alt={name} width={40} height={40} className="aspect-square object-contain w-14" />
                    </div>
                    <div className="lg:col-span-3 col-span-4 flex flex-col justify-center space-y-2 pl-2">
                        <h1 className="leading-none text-lg font-medium truncate">{name}</h1>
                        <p className="leading-none text-sm">{toRupiah(price)}</p>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-2 col-span-4 flex items-center h-full lg:justify-end">
                <Input type="number" name="quantity" onChange={hendleOnChange} min={1} max={stock} value={quantity} className="w-16 h-12 !text-lg" />
            </div>
            <div className="lg:col-span-3 col-span-5 flex items-center h-full justify-end text-lg font-medium">
                {toRupiah(price * quantity)}
            </div>

            <div className="col-span-9 flex items-center  mb-6 gap-2">
                <Input type="text" name="note" onChange={hendleOnChange} className="h-12" defaultValue={note} placeholder="Please, just a little bit spicy only." />
                <Button variant="outline" size="icon" className="h-12 w-12 p-6 !border-[var(--color-orange-primary)]" onClick={returnAction}>
                    <Trash color="var(--color-primary)" />
                </Button>
            </div>
        </div>
    );
}