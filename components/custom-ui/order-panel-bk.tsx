'use client';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toRupiah } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface OrderItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    note: string;
}

interface OrderPanelProps {
    items: OrderItem[];
    orderType: string;
    onOrderTypeChange: (type: string) => void;
    onQuantityChange: (id: number, delta: number) => void;
    onRemove: (id: number) => void;
    onNoteChange: (id: number, note: string) => void;
    onContinue: () => void;
}


const orderTypes = ['Dine In', 'To Go', 'Delivery'];

export const OrderPanel = ({
    items,
    orderType,
    onOrderTypeChange,
    onQuantityChange,
    onRemove,
    onNoteChange,
    onContinue,
}: OrderPanelProps) => {
    const [editingNoteId, setEditingNoteId] = useState<number | null>(null);

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = 0;
    const total = subtotal - discount;

    return (
        <div className="bg-[var(--color-base-dark-2)] h-full flex flex-col rounded-l-2xl min-w-[320px] w-full">
            <div className="p-6 pb-0">
                <h2 className="text-xl font-bold mb-1">Orders #34562</h2>
                <div className="flex gap-2 mb-4">
                    {orderTypes.map((type) => (
                        <Button
                            key={type}
                            variant={orderType === type ? 'default' : 'outline'}
                            size="sm"
                            className={`rounded-lg text-xs px-3 py-1 h-8 ${orderType === type
                                ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90'
                                : 'bg-transparent border-[var(--color-dark-line)] text-white/70 hover:bg-[var(--color-dark-line)]'
                                }`}
                            onClick={() => onOrderTypeChange(type)}
                        >
                            {type}
                        </Button>
                    ))}
                </div>
                <Separator className="bg-[var(--color-dark-line)]" />
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-white/50 gap-3">
                        <div className="bg-[var(--color-dark-line)]/30 rounded-full p-4">
                            <Trash2 size={32} className="text-white/30" />
                        </div>
                        <p className="text-sm">Your order is empty</p>
                        <p className="text-xs text-white/30">Select items from the menu to get started</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-5">
                        {items.map((item) => (
                            <div key={item.id} className="flex flex-col gap-2">
                                <div className="flex items-start gap-3">
                                    <div className="relative w-12 h-12 shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            sizes="48px"
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-sm font-medium truncate pr-2">{item.name}</h4>
                                            <span className="text-sm font-semibold shrink-0">{toRupiah(item.price * item.quantity)}</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    className="w-6 h-6 rounded border border-[var(--color-dark-line)] flex items-center justify-center text-white/70 hover:bg-[var(--color-dark-line)]"
                                                    onClick={() => onQuantityChange(item.id, -1)}
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                <button
                                                    className="w-6 h-6 rounded border border-[var(--color-dark-line)] flex items-center justify-center text-white/70 hover:bg-[var(--color-dark-line)]"
                                                    onClick={() => onQuantityChange(item.id, 1)}
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                            <button
                                                className="text-white/40 hover:text-[var(--color-primary)]"
                                                onClick={() => onRemove(item.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {editingNoteId === item.id ? (
                                    <input
                                        type="text"
                                        placeholder="Add a note..."
                                        value={item.note}
                                        onChange={(e) => onNoteChange(item.id, e.target.value)}
                                        onBlur={() => setEditingNoteId(null)}
                                        autoFocus
                                        className="bg-[var(--color-base-dark-1)] text-sm rounded-lg px-3 py-2 outline-none border border-[var(--color-dark-line)] text-white/80 placeholder:text-white/30 w-full"
                                    />
                                ) : (
                                    <button
                                        onClick={() => setEditingNoteId(item.id)}
                                        className="text-left text-xs text-white/40 hover:text-white/70 bg-[var(--color-base-dark-1)] rounded-lg px-3 py-2 border border-transparent hover:border-[var(--color-dark-line)] transition-colors"
                                    >
                                        {item.note || 'Add a note...'}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {items.length > 0 && (
                <div className="p-6 pt-2 border-t border-[var(--color-dark-line)]">
                    <div className="flex justify-between text-sm mb-2 text-white/70">
                        <span>Subtotal</span>
                        <span>{toRupiah(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4 text-white/70">
                        <span>Discount</span>
                        <span>{toRupiah(discount)}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold mb-4">
                        <span>Total</span>
                        <span>{toRupiah(total)}</span>
                    </div>
                    <Button
                        className="w-full rounded-lg py-6 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-semibold"
                        onClick={onContinue}
                    >
                        Continue to Payment
                    </Button>
                </div>
            )}
        </div>
    );
};
