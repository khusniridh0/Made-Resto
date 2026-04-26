'use client';

import { ProductCard } from "@/components/cards/product-card";
import { Dropdown } from "@/components/custom-ui/dropdown";
import { TabsContent } from "@/components/ui/tabs";
import { Product, ShoppingCart } from "@/types";
import { ChevronDown } from "lucide-react";
import { useCallback, useState } from "react";

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
    }[],
    shoppingCarts: ShoppingCart[],
    setShoppingCart: (data: ShoppingCart[]) => void
}

export const Menus = ({ filterOptions, menus, category, shoppingCarts, setShoppingCart }: OrderedCardProps) => {
    const [filteredMenus, setFilteredMenus] = useState(filterOptions[0].label);
    const filterMenus = (filter: string) => setFilteredMenus(filter)

    const groupByCategory = useCallback((items: string) => {
        return menus.filter((item) => item.category === items);
    }, [menus]);

    const addToCart = useCallback((product: Product) => {
        const cart = {
            product_id: product.id,
            detail: product,
            quantity: 1,
            subtotal: product.price,
            note: ''
        }

        const isExist = shoppingCarts.filter((item: ShoppingCart) => item.product_id === product.id)

        if (isExist.length > 0) {
            if (isExist[0].quantity >= product.stock) {
                return
            }

            setShoppingCart(shoppingCarts.map((item: ShoppingCart) => {
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
    }, [shoppingCarts, setShoppingCart])

    return (
        <>
            {category.map((item, idx) => (
                <TabsContent key={idx} value={item.value}>
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold">Choose {item.label}</h1>
                        <Dropdown selected={filterMenus} options={filterOptions}>
                            <div className="flex items-center gap-1 w-full justify-between">
                                <ChevronDown />
                                <span className="capitalize">
                                    {filteredMenus}
                                </span>
                            </div>
                        </Dropdown>
                    </div>

                    <ProductCard product={groupByCategory(item.value) as Product[]} onAdd={addToCart} />
                </TabsContent>
            ))}
        </>
    )
};
