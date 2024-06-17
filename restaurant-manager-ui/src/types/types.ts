import React from "react";

export interface ProtectedRouteProps {
    children: React.ReactNode;
    rolesAllowed: number[];
}

export interface AuthState {
    token: string | null;
    decodedToken: DecodedToken | null;
}

export interface AuthAction {
    type: 'LOGIN' | 'LOGOUT';
    payload?: string;
}


export interface DecodedToken {
    employeeId: number;
    username: string;
    role_id: number;
    iat: number;
    exp: number;
}

export interface Dish {
    id: number;
    name: string;
    price: number | string;
    cat_id: number;
    cost: number;
    min: number;
    stock: number;
    desc: string;
    img: string;
    allerg?: string;
}

export interface DataTableDishData {
    dishes:Dish[]
    getDishId:(id:number) => void
    open:() => void
}

export interface NewDishData {
    setDishId: (id: number | null) => void;
    dishes:Dish[]
    id:number | null
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
    price: number | string;
    cat_id: number;
    cost: number;
    min: number;
    stock: number;
}

export interface DataTableDrinkData {
    drinks:Drink[]
    getDrinkId:(id:number) => void
    open:() => void
}

export interface NewDrinkData {
    setDrinkId: (id: number | null) => void;
    drinks:Drink[]
    id:number | null
}

export interface Category {
    id: number;
    cat_name:string;
    type: string;
}

export interface DataTableCatData {
    categories:Category[]
    getCategoryId:(id:number) => void
    open:() => void
}

export interface NewCatData {
    setCategoryId: (id: number | null) => void;
    categories:Category[]
    id:number | null
    onUpdate: (category: Category) => void;
}

export interface Employee {
    id: number | null
    username: string;
    password: string;
    email: string;
    tel: string;
    role_id: number;
    status_id: number;
    roster_id: number;
    avatar?: string;
}

export interface DataTableEmployeeData {
    employees:Employee[]
    getEmployeeId:(id:number) => void
    open:() => void
}

export interface DataTableInactiveData {
    inactives:Employee[]
    getInactiveId:(id:number) => void
    open:() => void
}

export interface NewEmployeeData {
    setEmployeeId: (id: number | null) => void;
    employees:Employee[]
    id:number | null
}


export interface Role {
    id:number;
    role_name:string;
}

export interface DataTableRoleData {
    roles:Role[]
    getRoleId:(id:number) => void
    open:() => void
}

export interface DataTableRosterData {
    rosters:Roster[]
    getRosterId:(id:number) => void
    open:() => void
}

export interface NewRoleData {
    setRoleId: (id: number | null) => void;
    roles:Role[]
    id:number | null
}

export interface NewRosterData {
    setRosterId: (id: number | null) => void;
    rosters:Roster[]
    id:number | null
}

export interface Roster {
    id:number;
    roster: string;
}

export interface Order {
    order_id:number
    order_date:string
    username:string
    people:number
    validated:string
    validatedBy?:string
    total:number
}

export interface DataTableOrderData {
    orders:Order[]
    getOrderId:(id:number) => void
}

export interface OrderItems {
    order_item_id:number
    order_id:number
    type:string
    name:string
    price:number
    validated?:string
    validatedBy?:string
}

export interface NewOrderData {
    people: number
    username: string | null
    closeNewOrder: () => void;
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
    cat_id:number;
    stock:number;
    min:number;
}

export interface Booking {
    id: number;
    date: string;
    hour: string;
    name: string;
    email: string;
    people: number;
}

export interface DataTableBookingData {
    bookings:Booking[]
    getBookingId:(id:number) => void
    open:() => void
}

export interface NewBookingData {
    setBookingId: (id: number | null) => void;
    bookings:Booking[]
    id:number | null
}

export interface EmployeeCard {
    username: string;
    role: string;
    avatar: string;
    roster: string;
}

export interface Finance {
    id:number;
    month: string;
    orders: number;
    income: number;
    purchases: number;
    cost: number;
    stock:number;
    gain:number;
}

export interface LogoutService {
    logout: () => Promise<{ success: boolean; message: string }>;
}