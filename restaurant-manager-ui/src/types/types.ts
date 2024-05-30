

export interface Dish {
    id: number;
    name: string;
    price: number;
    cat: string;
    cost: number;
    min: number;
    stock: number;
    desc: string;
    img: string;
    allerg?: string;
}

export interface Drink {
    id: number;
    name: string;
    price: number;
    cat: string;
    cost: number;
    min: number;
    stock: number;
}
