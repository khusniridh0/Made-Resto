export type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    items: string;
};

export type ShoppingCart = {
    product_id: number;
    detail: Product
    quantity: number;
    subtotal: number;
    note: string
}

export type State = {
    products: Product[]
    shoppingCarts: ShoppingCart[]
};

export type Action =
    | { type: 'ADD_PRODUCT'; payload: Product[] }
    | { type: 'ADD_SHOPPING_CART'; payload: ShoppingCart[] }