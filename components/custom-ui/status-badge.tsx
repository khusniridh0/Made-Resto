import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
    children: React.ReactNode;
    status: keyof typeof statusVariants;
    classes?: string;
}

export const statusVariants = {
    pending: "bg-[var(--color-accent-yellow)]/20 text-[var(--color-accent-yellow)]",
    completed: "bg-[var(--color-accent-green)]/20 text-[var(--color-accent-green)]",
    cancelled: "bg-[var(--color-accent-red)]/20 text-[var(--color-accent-red)]",
    preparing: "bg-[#3a2b50] text-[#ece2f9]",
}

export const StatusBadge = ({ children, status, classes }: StatusBadgeProps) => {
    return (
        <Badge className={`${statusVariants[status]} capitalize px-4 py-3 text-md ${classes}`}>
            {children}
        </Badge>
    );
}