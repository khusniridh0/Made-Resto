'use client';

import { ProductCard } from "@/components/cards/product-card";
import { Drobdown } from "@/components/custom-ui/drobdown";
import { TabsContent } from "@/components/ui/tabs";
import { DataContext } from "@/contexts/data-provider";
import { Product } from "@/types";
import { ChevronDown } from "lucide-react";
import { useContext, useState } from "react";

interface OrderedCardProps {
    filterOptions: {
        label: string;
        value: string;
    }[],
    menus: {
        name: string
        price: number,
        image: string,
        category: string,
        stock: number,
        items?: string
    }[],
    category: {
        label: string
        value: string
    }[]
}

export const Menus = ({ filterOptions, menus, category }: OrderedCardProps) => {
    const [filteredMenus, setFilteredMenus] = useState(filterOptions[0].label);
    const dataContext = useContext(DataContext);
    const filterMenus = (filter: string) => setFilteredMenus(filter)

    if (!dataContext) { return null }

    const { shoppingCarts, setShoppingCart } = dataContext

    const groupByCategory = (items: string) => {
        const filtered = menus.filter((item) => item.category === items);
        return filtered
    };

    const addToCart = (product: Product) => {
        const cart = {
            product_id: product.id,
            detail: product,
            quantity: 1,
            subtotal: product.price,
            note: ''
        }

        const isExist = shoppingCarts.filter((item) => item.product_id === product.id)

        if (isExist.length > 0) {
            if (isExist[0].quantity >= product.stock) {
                return
            }

            setShoppingCart(shoppingCarts.map((item) => {
                if (item.product_id === product.id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                        subtotal: item.subtotal + product.price
                    }
                }
                return item
            }))
        } else {
            setShoppingCart([...shoppingCarts, cart])
        }
    }

    return (
        <>
            {category.map((item, idx) => (
                <TabsContent key={idx} value={item.value}>
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold">Choose {item.label}</h1>
                        <Drobdown selected={filterMenus} options={filterOptions}>
                            <div className="flex items-center gap-1 w-full justify-between">
                                <ChevronDown />
                                <span className="capitalize">
                                    {filteredMenus}
                                </span>
                            </div>
                        </Drobdown>
                    </div>

                    <ProductCard product={groupByCategory(item.value) as Product[]} onAdd={addToCart} />
                </TabsContent>
            ))}
        </>
    )
};
