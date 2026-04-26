'use client';

import { Button } from "@/components/ui/button";
import { toRupiah } from "@/lib/utils";
import { Plus } from "lucide-react";
import Image from "next/image";

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    stock: number;
}

interface ProductCardProps {
    product: Product;
    onAdd: (product: Product) => void;
}

export const ProductCard = ({ product, onAdd }: ProductCardProps) => {
    return (
        <div className="bg-[var(--color-base-dark-2)] p-4 rounded-xl flex flex-col items-center text-center gap-3 min-w-[140px]">
            <div className="relative w-24 h-24">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="96px"
                    className="object-contain"
                />
            </div>
            <h3 className="text-sm font-semibold leading-tight min-h-[2.5rem]">{product.name}</h3>
            <div className="flex items-center justify-between w-full">
                <span className="text-sm font-medium text-white/80">{toRupiah(product.price)}</span>
                <Button
                    size="icon"
                    className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-white rounded-lg h-8 w-8"
                    onClick={() => onAdd(product)}
                >
                    <Plus size={16} />
                </Button>
            </div>
            <span className="text-xs text-white/50 self-start">{product.stock} Bowls available</span>
        </div>
    );
};
