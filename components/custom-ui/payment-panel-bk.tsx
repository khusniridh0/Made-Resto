'use client';

import { Button } from "@/components/ui/button";
import { toRupiah } from "@/lib/utils";
import { CreditCard, Banknote, Wallet } from "lucide-react";
import { useState } from "react";

interface PaymentPanelProps {
    total: number;
    onBack: () => void;
    onConfirm: () => void;
}


const paymentMethods = [
    { id: 'credit', label: 'Credit Card', icon: CreditCard },
    { id: 'paypal', label: 'PayPal', icon: Wallet },
    { id: 'cash', label: 'Cash', icon: Banknote },
];

export const PaymentPanel = ({ total, onBack, onConfirm }: PaymentPanelProps) => {
    const [method, setMethod] = useState('credit');
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvv, setCvv] = useState('');

    return (
        <div className="bg-[var(--color-base-dark-2)] h-full flex flex-col rounded-l-2xl min-w-[320px] w-full p-6">
            <h2 className="text-xl font-bold mb-6">Payment Method</h2>

            <div className="flex flex-col gap-3 mb-6">
                {paymentMethods.map((pm) => {
                    const Icon = pm.icon;
                    const isActive = method === pm.id;
                    return (
                        <button
                            key={pm.id}
                            onClick={() => setMethod(pm.id)}
                            className={`flex items-center gap-3 p-4 rounded-xl border transition-colors text-left ${isActive
                                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                                : 'border-[var(--color-dark-line)] bg-transparent hover:bg-[var(--color-base-dark-1)]'
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-dark-line)] text-white/60'}`}>
                                <Icon size={20} />
                            </div>
                            <span className="text-sm font-medium">{pm.label}</span>
                        </button>
                    );
                })}
            </div>

            {method === 'credit' && (
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-white/60">Name on Card</label>
                        <input
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="John Doe"
                            className="bg-[var(--color-base-dark-1)] text-sm rounded-lg px-3 py-2.5 outline-none border border-[var(--color-dark-line)] text-white/90 placeholder:text-white/30"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-white/60">Card Number</label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="0000 0000 0000 0000"
                            className="bg-[var(--color-base-dark-1)] text-sm rounded-lg px-3 py-2.5 outline-none border border-[var(--color-dark-line)] text-white/90 placeholder:text-white/30"
                        />
                    </div>
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-xs text-white/60">Expiration Date</label>
                            <input
                                type="text"
                                value={expiration}
                                onChange={(e) => setExpiration(e.target.value)}
                                placeholder="MM/YY"
                                className="bg-[var(--color-base-dark-1)] text-sm rounded-lg px-3 py-2.5 outline-none border border-[var(--color-dark-line)] text-white/90 placeholder:text-white/30"
                            />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-xs text-white/60">CVV</label>
                            <input
                                type="text"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                placeholder="000"
                                className="bg-[var(--color-base-dark-1)] text-sm rounded-lg px-3 py-2.5 outline-none border border-[var(--color-dark-line)] text-white/90 placeholder:text-white/30"
                            />
                        </div>
                    </div>
                </div>
            )}

            {method === 'paypal' && (
                <div className="flex flex-col gap-4 mb-6">
                    <p className="text-sm text-white/60 text-center py-6">
                        You will be redirected to PayPal to complete your payment.
                    </p>
                </div>
            )}

            {method === 'cash' && (
                <div className="flex flex-col gap-4 mb-6">
                    <p className="text-sm text-white/60 text-center py-6">
                        Please prepare exact cash for the delivery.
                    </p>
                </div>
            )}

            <div className="mt-auto">
                <div className="flex justify-between text-base font-bold mb-4">
                    <span>Total</span>
                    <span>{toRupiah(total)}</span>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1 rounded-lg py-5 border-[var(--color-dark-line)] text-white/70 hover:bg-[var(--color-dark-line)] hover:text-white"
                        onClick={onBack}
                    >
                        Back
                    </Button>
                    <Button
                        className="flex-[2] rounded-lg py-5 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-semibold"
                        onClick={onConfirm}
                    >
                        Confirm Payment
                    </Button>
                </div>
            </div>
        </div>
    );
};
