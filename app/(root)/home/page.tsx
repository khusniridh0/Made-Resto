import { Menus } from "@/components/cards/menus";
import OrderProcess from "@/components/cards/ourder-process";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { data } from '@/service/data';
import { Search } from "lucide-react";

const filterOrder = [
    { label: 'Dine In', value: 'dine in' },
    { label: 'Take It', value: 'take it' },
    { label: 'Delivery', value: 'delivery' },
]

const category = [
    { label: 'Hot Dishes', value: 'dishes' },
    { label: 'Soup', value: 'soup' },
    { label: 'Grill', value: 'grill' },
    { label: 'Appetizer', value: 'appetizer' },
    { label: 'Dessert', value: 'dessert' },
]

const HomePage = () => {
    return (
        <div className="w-full p-6 grid grid-cols-12 gap-6">
            <div className="lg:col-span-7 xl:col-span-8 col-span-12">
                <section id="headers" className="mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold">Made Resto</h1>
                            <p className="text-md">Tuesday 2 Feb, 2021</p>
                        </div>
                        <InputGroup className="max-w-xs">
                            <InputGroupInput placeholder="Search for food, coffe, etc.." />
                            <InputGroupAddon>
                                <Search />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </section>

                <section id="tabs" className="w-full">
                    <Tabs defaultValue="dishes">
                        <TabsList variant="line" className="flex overflow-x-auto w-full lg:w-fit scrollbar-hide pl-4">
                            <TabsTrigger className="text-md font-medium pb-4" value="dishes">Hot Dishes</TabsTrigger>
                            <TabsTrigger className="text-md font-medium pb-4" value="soup">Soup</TabsTrigger>
                            <TabsTrigger className="text-md font-medium pb-4" value="grill">Grill</TabsTrigger>
                            <TabsTrigger className="text-md font-medium pb-4" value="appetizer">Appetizer</TabsTrigger>
                            <TabsTrigger className="text-md font-medium pb-4" value="dessert">Dessert</TabsTrigger>
                        </TabsList>
                        <Separator className="mb-6 bg-[var(--color-dark-line)] -translate-y-2" />
                        <Menus category={category} menus={data.menuProducts} filterOptions={filterOrder} />
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