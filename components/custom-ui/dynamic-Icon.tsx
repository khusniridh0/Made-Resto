'use client'; // Menandakan komponen hanya dirender di sisi klien

import { BookmarkMinus, CircleDollarSign, Users } from "lucide-react";

interface IconProps {
    iconName: 'BookmarkMinus' | 'CircleDollarSign' | 'Users';
}

export const myIcons = {
    BookmarkMinus, CircleDollarSign, Users
};

// Fungsi dengan Arrow Function
export const IconComponent = ({ iconName }: IconProps) => {
    // Memilih ikon berdasarkan nama
    const SelectedIcon = myIcons[iconName];
    return <SelectedIcon />;
};