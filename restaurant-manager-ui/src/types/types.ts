

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

export interface Props {
    dishName: string,
    dishImg: string,
    dishDesc: string
    dishPrice: number
    dishAllerg?: string
    closePopup:() => void
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

export interface Category {
    id: number;
    cat_name:string;
}

export interface Employee {
    id: number | null
    username: string;
    password: string;
    email: string;
    tel: string;
    role: string;
    status: string;
    roster?: string;
    avatar: string;
}

//temporary
export interface FormerEmployee {
    id: number
    username: string;
    password: string;
    email: string;
    tel: string;
    role: string;
    status: string;
}

export interface Role {
    id:number;
    role_name:string;
}

export interface Order {
    id:number
    date:string
    by:string
    people:number
    checked:boolean
    checkedBy:string
    total:number
}

export interface Purchase {
    id:number
    date:string
    by:string
    cost:number
    status:string
}

export interface Food {
    id: number;
    name: string;
    cat:string;
    stock:number;
    min:number;
}

export interface Booking {
    id: number;
    date: string;
    hour: string;
    name: string;
    email: string;
    numberOfPeople: number;
}

export interface Item {
    name: string
    price: number
    cat: string
}

export interface EmployeeCard {
    username: string;
    role: string;
    avatar: string;
    roster: string;
}