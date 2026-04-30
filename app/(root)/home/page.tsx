'use client';

import { Menus } from "@/components/cards/menus";
import { OrderProcess } from "@/components/cards/order-process";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataContext } from "@/contexts/data-provider";
import { dateNow } from "@/lib/utils";
import { data } from '@/service/data';
import { Search } from "lucide-react";
import { useContext, useState } from "react";

// interface searchType {
//     name: string
//     price: number,
//     image: string,
//     category: string,
//     stock: number,
//     items?: string
// }[]

const filterOrder = [
    { label: 'Dine In', value: 'dine in' },
    { label: 'Take It', value: 'take it' },
    { label: 'Delivery', value: 'delivery' },
]

const category = [
    { label: 'Hot Dishes', value: 'hot-dishes' },
    { label: 'Cold Dishes', value: 'cold-dishes' },
    { label: 'Soup', value: 'soup' },
    { label: 'Grill', value: 'grill' },
    { label: 'Appetizer', value: 'appetizer' },
    { label: 'Dessert', value: 'dessert' },
]

const HomePage = () => {
    const dataContext = useContext(DataContext);
    const [productList, setProductList] = useState(data.menuProducts);

    if (!dataContext) { return null }

    const { shoppingCarts, setShoppingCart } = dataContext;

    const searchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { value } = e.target;
        const newData = data.menuProducts.filter(item => {
            return item.name.toLowerCase().includes(value.toLowerCase())
        })
        setProductList(newData)
    }

    return (
        <div className="w-full h-full p-4 sm:p-6 grid grid-cols-12 gap-6">
            <div className="lg:col-span-7 xl:col-span-8 col-span-12">
                <section id="headers" className="mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-y-4">
                        <div>
                            <h1 className="text-3xl font-bold">Made Resto</h1>
                            <p className="text-md">{dateNow()}</p>
                        </div>
                        <InputGroup className="max-w-xs">
                            <InputGroupInput type="text" name="search" onChange={searchProduct} placeholder="Search for food, coffe, etc.." />
                            <InputGroupAddon>
                                <Search />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </section>

                <section id="tabs" className="w-full">
                    <Tabs defaultValue={category[0].value}>
                        <TabsList variant="line" className="flex overflow-x-auto w-full lg:w-fit scrollbar-hide pl-4">
                            {category.map((item, idx) => (
                                <TabsTrigger className="text-md font-medium pb-4" value={item.value} key={idx}>{item.label}</TabsTrigger>
                            ))}
                        </TabsList>
                        <Separator className="mb-6 bg-[var(--color-dark-line)] -translate-y-2" />
                        <Menus category={category} menus={productList} filterOptions={filterOrder} shoppingCarts={shoppingCarts} setShoppingCart={setShoppingCart} />
                    </Tabs>
                </section>
            </div>
            <aside className="lg:col-span-5 xl:col-span-4 col-span-12 relative">
                <OrderProcess />
            </aside>
        </div>
    );
}

export default HomePage;