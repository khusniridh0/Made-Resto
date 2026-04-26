"use client"

import { createContext, useReducer } from "react";
import { data } from '@/service/data'
import { Action, Product, ShoppingCart, State } from "@/types";

export const DataContext = createContext<{
    products: Product[]
    shoppingCarts: ShoppingCart[]
    setProduct: (data: Product[]) => void;
    setShoppingCart: (data: ShoppingCart[]) => void;

} | undefined>(undefined);

const initialState: State = {
    products: data.menuProducts,
    shoppingCarts: []
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: action.payload
            }
        case 'ADD_SHOPPING_CART':
            return {
                ...state,
                shoppingCarts: action.payload
            }
        default:
            return state;
    }
}

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setProduct = (data: Product[]) => {
        dispatch({
            type: 'ADD_PRODUCT',
            payload: data
        })
    }

    const setShoppingCart = (data: ShoppingCart[]) => {
        dispatch({
            type: 'ADD_SHOPPING_CART',
            payload: data
        })
    }

    const contectsValue = {
        products: state.products,
        shoppingCarts: state.shoppingCarts,
        setProduct,
        setShoppingCart
    }

    return (
        <DataContext.Provider value={contectsValue}>
            {children}
        </DataContext.Provider>
    )
}