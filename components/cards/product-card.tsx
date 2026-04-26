'use client';

import { toRupiah } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";

interface ProductCardProps {
    product: Product[];
    onAdd: (product: Product) => void;
}

export const ProductCard = ({ product, onAdd }: ProductCardProps) => {

    return (
        <div className="grid grid-cols-12 w-full gap-6 select-none cursor-pointer">
            {product.map((item) => (
                <div onClick={() => onAdd(item)} className="col-span-4 bg-[var(--color-base-dark-2)] rounded-lg text-center translate-y-[66px] h-[calc(100%-66px)] py-6 px-4" key={item.id} role="button" tabIndex={0}>
                    <div className="-translate-y-[66px]">
                        <Image src={item.image} alt={item.name} width={132} height={132} className="mx-auto aspect-square object-contain mb-6" />
                        <div className="space-y-1">
                            <h4 className="text-lg font-medium capitalize">{item.name}</h4>
                            <p className="text-xl font-medium" >{toRupiah(item.price)}</p>
                            <span className="text-md font-normal">{item.stock} Bowls available</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
