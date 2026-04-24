import { ArrowUp } from "lucide-react";

interface SummaryCardHeaderProps {
    children: React.ReactNode;
    growth: string;
    status: boolean;
    variant?: keyof typeof summaryVariants;
}

export const summaryVariants = {
    purple: "bg-[var(--color-accent-purple)]/30 text-[var(--color-accent-purple)]",
    blue: "bg-[var(--color-accent-blue)]/30 text-[var(--color-accent-blue)]",
    green: "bg-[var(--color-accent-green)]/30 text-[var(--color-accent-green)]",
    red: "bg-[var(--color-accent-red)]/30 text-[var(--color-accent-red)]",
    yellow: "bg-[var(--color-accent-yellow)]/30 text-[var(--color-accent-yellow)]",
}

export const SummaryCard = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-[var(--color-base-dark-2)] p-4 rounded-xl md:max-w-[calc(100%/2-24px)] lg:max-w-[calc(100%/2-24px)] xl:max-w-[calc(100%/3-24px)] w-full">
            {children}
        </div>
    );
}


export const SummaryCardHeader = ({ children, growth, status, variant }: SummaryCardHeaderProps) => {
    return (
        <div className="flex gap-2 items-center mb-2">
            <span className={`${summaryVariants[variant || 'blue']} p-2 rounded-lg`}>
                {children}
            </span>
            <span className={`${status ? 'text-[var(--color-accent-green)]' : 'text-[var(--color-accent-red)]'}`}>{growth}</span>
            <span className={`${status ? 'bg-[var(--color-accent-green)]/30 text-[var(--color-accent-green)]' : 'bg-[var(--color-accent-red)]/30 text-[var(--color-accent-red)]'} rounded-full p-1`}>
                {status ? <ArrowUp size={16} /> : <ArrowUp size={16} className="rotate-180" />}
            </span>
        </div >
    )
}