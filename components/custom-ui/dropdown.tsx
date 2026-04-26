import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface DropdownMenuProps {
    children: React.ReactNode,
    selected: (value: string) => void,
    options: {
        label: string,
        value: string
    }[]
}

export const Dropdown = ({ children, selected, options }: DropdownMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent hover:bg-transparent hover:text-inherit px-4 min-w-[95px] rounded-lg h-12"
                >
                    {children}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[var(--color-base-dark-2)] border-none outline-none rounded-xl">
                {options.map((option) => (
                    <DropdownMenuItem key={option.value} onClick={() => selected(option.value)}>
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}