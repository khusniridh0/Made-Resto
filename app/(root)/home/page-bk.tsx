'use client';

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ProductCard, Product } from "@/components/cards/product-card-bk";
import { OrderItem, OrderPanel } from "@/components/custom-ui/order-panel";
import { PaymentPanel } from "@/components/custom-ui/payment-panel-bk";
import { data } from "@/service/data";

const HomePage = () => {
    const [view, setView] = useState<'menu' | 'payment'>('menu');
    const [activeCategory, setActiveCategory] = useState('all');
    const [orderType, setOrderType] = useState('Dine In');
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

    const filteredProducts = activeCategory === 'all'
        ? data.menuProducts
        : data.menuProducts.filter((p) => p.category === activeCategory);

    const handleAddProduct = (product: Product) => {
        setOrderItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [
                ...prev,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                    note: '',
                },
            ];
        });
    };

    const handleQuantityChange = (id: number, delta: number) => {
        setOrderItems((prev) =>
            prev
                .map((item) =>
                    item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const handleRemoveItem = (id: number) => {
        setOrderItems((prev) => prev.filter((item) => item.id !== id));
    };

    const handleNoteChange = (id: number, note: string) => {
        setOrderItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, note } : item))
        );
    };

    const handleContinue = () => {
        if (orderItems.length > 0) {
            setView('payment');
        }
    };

    const handleBack = () => {
        setView('menu');
    };

    const handleConfirmPayment = () => {
        alert('Payment confirmed!');
        setOrderItems([]);
        setView('menu');
    };

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="flex w-full h-screen overflow-hidden bg-[var(--color-base-dark-1)] text-white">
            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 lg:p-8">
                    <section id="header" className="mb-8">
                        <h1 className="text-3xl font-bold">Menu</h1>
                        <p className="text-md text-white/60 mt-1">Tuesday 2 Feb, 2021</p>
                        <Separator className="my-6 bg-[var(--color-dark-line)]" />
                    </section>

                    <section id="categories" className="mb-8">
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {data.categories.map((cat) => (
                                <button
                                    key={cat.value}
                                    onClick={() => setActiveCategory(cat.value)}
                                    className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat.value
                                        ? 'bg-[var(--color-primary)] text-white'
                                        : 'bg-[var(--color-base-dark-2)] text-white/70 hover:bg-[var(--color-dark-line)]'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section id="products">
                        <h2 className="text-xl font-semibold mb-5">
                            {activeCategory === 'all' ? 'All Menu' : data.categories.find(c => c.value === activeCategory)?.label}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAdd={handleAddProduct}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            {/* Right Panel */}
            <aside className="w-[380px] lg:w-[420px] shrink-0 h-full border-l border-[var(--color-dark-line)] overflow-hidden">
                {view === 'menu' ? (
                    <OrderPanel
                        items={orderItems}
                        orderType={orderType}
                        onOrderTypeChange={setOrderType}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemoveItem}
                        onNoteChange={handleNoteChange}
                        onContinue={handleContinue}
                    />
                ) : (
                    <PaymentPanel
                        total={subtotal}
                        onBack={handleBack}
                        onConfirm={handleConfirmPayment}
                    />
                )}
            </aside>
        </div>
    );
};

export default HomePage;