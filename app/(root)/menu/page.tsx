'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toRupiah } from "@/lib/utils";
import { data } from '@/service/data';
import { Product } from "@/types";
import { Dot, Pencil, Plus, SlidersHorizontal, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CardProductProps {
    products: Product[],
    add: () => void
    edited: (id: number) => void
}

const initialState = {
    id: 0,
    name: '',
    price: 0,
    image: '',
    category: '',
    stock: 1,
    items: '',
}

const category = [
    { label: 'Hot Dishes', value: 'dishes' },
    { label: 'Soup', value: 'soup' },
    { label: 'Grill', value: 'grill' },
    { label: 'Appetizer', value: 'appetizer' },
    { label: 'Dessert', value: 'dessert' },
]

const CardProduct = ({ products, add, edited }: CardProductProps) => {

    return (
        <>
            <div onClick={add} className="border-2 border-dashed border-[var(--color-orange-primary)] col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 rounded-xl relative cursor-pointer" role="button" tabIndex={0}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-6">
                    <Plus className="size-8" />
                    <div className="text-lg font-semibold">Add new dish</div>
                </div>
            </div>
            {products.map((product, idx) => (
                <div className="border border-[var(--color-dark-line)] col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 rounded-xl" key={idx}>
                    <div className="flex flex-col items-center w-full p-6" >
                        <Image src={product.image} width={144} height={144} sizes="144px" className="aspect-square object-contain mb-6" alt="product" priority={true} />
                        <div className="text-lg font-medium">{product.name}</div>
                        <div className="grid grid-cols-11">
                            <span className="col-span-5 text-end">{toRupiah(product.price)}</span>
                            <span className="col-span-1">
                                <Dot className="mx-auto size-7" />
                            </span>
                            <span className="col-span-5 text-start">{product.stock} Bowls</span>
                        </div>
                    </div>
                    <Button onClick={() => edited(product.id)} variant="default" className="w-full h-12 bg-[var(--color-orange-primary)]/20 hover:bg-[var(--color-orange-primary)]/30 text-[var(--color-orange-primary)] rounded-t-none">
                        <Pencil />
                        Edit dish
                    </Button>
                </div>
            ))}
        </>
    )
}

const ManagePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [badgeActive, setBadgeActive] = useState('hot_dishes');
    const [formData, setFormData] = useState(initialState)
    const groupByCategory = (items: string) => { return data.menuProducts.filter((item) => item.category === items) };

    const openForm = () => { setIsOpen(true) };

    const edited = (id: number) => {
        const product = data.menuProducts.filter((item) => item.id === id)

        if (product.length > 0) {
            setFormData(product[0])
            openForm()
        }
    }

    const onClose = () => {
        setFormData(initialState)
        setIsOpen(false)
    };

    return (
        <div className="w-full space-y-6 p-6">
            <div className="lg:col-span-7 xl:col-span-8 col-span-12">
                <section id="headers" className="mb-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold">Settings</h1>
                    </div>
                </section>
            </div>

            <div className="bg-[var(--color-base-dark-2)] p-6 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Order Report</h1>
                    <Button variant="outline" className="h-12">
                        <SlidersHorizontal />
                        Manage Categories
                    </Button>
                </div>

                <Tabs defaultValue="dishes">
                    <TabsList variant="line" className="flex overflow-x-auto w-full lg:w-fit scrollbar-hide pl-4">
                        {category.map((item, idx) => (
                            <TabsTrigger className="text-md font-medium pb-4 capitalize" value={item.value} key={idx}>{item.label}</TabsTrigger>
                        ))}
                    </TabsList>
                    <Separator className="mb-6 bg-[var(--color-dark-line)] -translate-y-2" />

                    {category.map((item, idx) => (
                        <TabsContent className="w-full grid grid-cols-12 gap-6" key={idx} value={item.value}>
                            <CardProduct products={groupByCategory(item.value)} add={openForm} edited={edited} />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>

            <Drawer direction="right" open={isOpen} onOpenChange={onClose}>
                <DrawerContent className="bg-[var(--color-base-dark-2)] p-4 pr-0">
                    <DrawerHeader className="hidden">
                        <DrawerTitle />
                    </DrawerHeader>

                    <div className="relative h-full">
                        <div className="pr-3">
                            <div className="text-2xl font-bold mb-6">Add New Dish</div>
                            <div className="space-x-3">
                                <Badge
                                    onClick={() => setBadgeActive('hot_dishes')}
                                    className={`${badgeActive == 'hot_dishes' ? 'text-white border-[var(--color-orange-primary)] bg-[var(--color-orange-primary)]' : 'text-[var(--color-orange-primary)] border-[var(--color-dark-line)] bg-transparant'} text-md rounded-lg py-4  border cursor-pointer`}>
                                    Hot Dishes
                                </Badge>
                                <Badge
                                    onClick={() => setBadgeActive('cold_dishes')}
                                    className={`${badgeActive == 'cold_dishes' ? 'text-white border-[var(--color-orange-primary)] bg-[var(--color-orange-primary)]' : 'text-[var(--color-orange-primary)] border-[var(--color-dark-line)] bg-transparant'} text-md rounded-lg py-4  border cursor-pointer`}>
                                    Cold Dishes
                                </Badge>
                                <Badge
                                    onClick={() => setBadgeActive('soup')}
                                    className={`${badgeActive == 'soup' ? 'text-white border-[var(--color-orange-primary)] bg-[var(--color-orange-primary)]' : 'text-[var(--color-orange-primary)] border-[var(--color-dark-line)] bg-transparant'} text-md rounded-lg py-4  border cursor-pointer`}>
                                    Soup
                                </Badge>
                                <Badge
                                    onClick={() => setBadgeActive('grill')}
                                    className={`${badgeActive == 'grill' ? 'text-white border-[var(--color-orange-primary)] bg-[var(--color-orange-primary)]' : 'text-[var(--color-orange-primary)] border-[var(--color-dark-line)] bg-transparant'} text-md rounded-lg py-4  border cursor-pointer`}>
                                    Grill
                                </Badge>
                            </div>

                        </div>

                        <div className="pr-3">
                            <Separator className="mt-6 bg-[var(--color-dark-line)] col-span-9" />
                        </div>

                        <div className="max-h-[calc(100vh-190px)] overflow-y-auto pr-3 py-4">
                            <FieldGroup>
                                <Field>
                                    <FileUpload
                                        onFileSelect={(file) => console.log('Selected file:', file)}
                                        accept="image/*"
                                        maxSize={5}
                                        previewUrl={formData?.image}
                                    >
                                        <Upload className="mx-auto h-12 w-12 text-[var(--color-orange-primary)] mb-4" />
                                        <p className="text-lg font-medium mb-2"> Drag and drop your file here </p>
                                        <p className="text-sm text-muted-foreground"> or click to browse files </p>
                                        <p className="text-xs text-muted-foreground mt-2"> Max size: 20 MB </p>
                                    </FileUpload>
                                </Field>

                                <Field>
                                    <FieldLabel className="text-lg" htmlFor="product_name">Product Name</FieldLabel>
                                    <Input id="product_name" type="text" placeholder="Enter your product name" defaultValue={formData?.name} required className="h-12 rounded-lg" />
                                </Field>

                                <Field>
                                    <FieldLabel className="text-lg" htmlFor="price">Price</FieldLabel>
                                    <Input id="price" type="text" placeholder="price" defaultValue={formData?.price} required className="h-12 rounded-lg" />
                                </Field>

                                <div className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel className="text-lg" htmlFor="stock">Stock</FieldLabel>
                                        <Input id="stock" type="number" min={1} defaultValue={formData?.stock} required className="h-12 rounded-lg" />
                                    </Field>

                                    <Field>
                                        <FieldLabel className="text-lg" htmlFor="item">Item</FieldLabel>
                                        <Input id="item" type="text" placeholder="ex: cup, plate" defaultValue={formData?.items} required className="h-12 rounded-lg" />
                                    </Field>
                                </div>
                            </FieldGroup>
                        </div>

                        <div className="absolute left-0 right-0 bottom-0 z-10 bg-[var(--color-base-dark-2)] pr-3">
                            <DrawerClose asChild>
                                <Button type="button" className="!border-[var(--color-orange-primary)] bg-[var(--color-orange-primary)] text-white h-12 w-full font-bold rounded-lg">Save</Button>
                            </DrawerClose>
                        </div>
                    </div>

                </DrawerContent >
            </Drawer >
        </div >
    );
}


export default ManagePage;