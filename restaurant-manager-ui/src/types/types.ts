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

export interface NotifState {
    orderCount: number
    purchaseCount: number
    bookingCount: number
}

export interface NotifAction {
    type: 'ADD_ORDER_NOTIF' |
        'ADD_PURCHASE_NOTIF' |
        'ADD_BOOKING_NOTIF' |
        'RESET_ORDER_NOTIF' |
        'RESET_PURCHASE_NOTIF' |
        'RESET_BOOKING_NOTIF'
}


export interface DecodedToken {
    employeeId: number;
    username: string;
    role_id: number;
    gender: string;
    iat: number;
    exp: number;
}

export interface NavbarBoolean {
    isOnAbout: boolean;
}

export interface SuccessMsgData {
    closeSuccessMsg: () => void;
    name: string
    people: number
    date: string
    hour: string
    error: boolean
}

export interface AvatarData {
    username: string | null
    gender?: string | null
    roleId?: number | null
}

export interface MenuSidebarData {
    onItemSelect: (item:string) => void
    selectedItem: string
    categories: Category[]
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

export interface DishSidebarData {
    onItemSelect: (item:string) => void
    selectedItem: string
    categories:Category[]
}

export interface DataTableDishData {
    dishes: Dish[]
    getDishId: (id: number) => void
    open: () => void
}

export interface NewDishData {
    dishes: Dish[]
    onAddOrEdit: () => void;
    close: () => void;
    id: number | null
}

export interface Props {
    dishName: string,
    dishImg: string,
    dishDesc: string
    dishPrice: number | string
    dishAllerg?: string
    closePopup: () => void
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

export interface DrinkSidebarData {
    onItemSelect: (item: string) => void
    selectedItem: string
    categories:Category[]
}

export interface DataTableDrinkData {
    drinks: Drink[]
    getDrinkId: (id: number) => void
    open: () => void
}

export interface NewDrinkData {
    drinks: Drink[]
    onAddOrEdit: () => void;
    close: () => void;
    id: number | null
}

export interface Category {
    id: number;
    cat_name: string;
    type: string;
}

export interface DataTableCatData {
    categories: Category[]
    getCategoryId: (id: number) => void
    open: () => void
}

export interface NewCatData {
    categories: Category[]
    id: number | null
    onAddOrEdit: () => void;
    close: () => void;
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
    gender: string;
}

export interface DataTableEmployeeData {
    employees: Employee[]
    getEmployeeId: (id: number) => void
    open: () => void
}

export interface DataTableInactiveData {
    inactives: Employee[]
    getInactiveId: (id: number) => void
    open: () => void
}

export interface NewEmployeeData {
    employees: Employee[]
    onAddOrEdit: () => void;
    close: () => void;
    id: number | null
    user: string | null
}


export interface Role {
    id: number;
    role_name: string;
}

export interface DataTableRoleData {
    roles: Role[]
    getRoleId: (id: number) => void
    open: () => void
}

export interface DataTableRosterData {
    rosters: Roster[]
    getRosterId: (id: number) => void
    open: () => void
}

export interface NewRoleData {
    roles: Role[]
    onAddOrEdit: () => void;
    close: () => void;
    id: number | null
}

export interface NewRosterData {
    rosters: Roster[]
    onAddOrEdit: () => void;
    close: () => void;
    id: number | null
}

export interface Roster {
    id: number;
    roster: string;
}

export interface Order {
    order_id: number
    order_date: string
    username: string
    people: number
    validated: string
    validatedBy?: string
    total: number
}

export interface DataTableOrderData {
    orders: Order[]
    getOrderId: (id: number) => void
    open: () => void
}

export interface OrderId {
    order_id: number | null;
}

export interface OrderItems {
    order_item_id: number
    order_id: number
    type: string
    name: string
    price: number
    validated?: string
    validatedBy?: string
}

export interface NewOrderData {
    people: number
    username: string | null
    closeNewOrder: () => void;
}

export interface Purchase {
    purchase_id: number | null
    purchase_date: string
    cost: number
    delivery_date: string
}

export interface DataTablePurchaseData {
    purchases: Purchase[]
    getPurchaseIdAndDeliveryDate: (purchase_id: number,delivery_date:string) => void
    open: () => void
}

export interface DataTableDeliveredPurchaseData {
    deliveredPurchases: Purchase[]
    getPurchaseId: (purchase_id: number) => void
    open: () => void
}

export interface NewPurchaseData {
    purchases: Purchase[]
    purchase_id: number | null
    delivery_date: string
    onAddOrEdit: () => void;
    close: () => void;
}

export type ItemData = {
    id: number;
    name: string;
    qty: number;
    type: string;
    cost: number;
    delivery_date: string;
}


export type purchaseId = {
    purchase_id: number | null
}

export type StockItem = {
    id: number
    item_name: string;
    quantity: number;
    cat_id: number
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
    bookings: Booking[]
    getBookingId: (id: number) => void
    open: () => void
}

export interface NewBookingData {
    onAddOrEdit: () => void;
    close: () => void;
    bookings: Booking[]
    id: number | null
}

export interface EmployeeCard {
    id: number | null
    username: string;
    roster: string;
    avatar: string;
}

export interface Finance {
    id: number;
    order_date?: string;
    order_id?:number;
    total?: number;
    comments?: string | null;
    totalPurchase?: number;
    purchase_date?:string;
    purchase_id?:number;
    remarks?:string | null;
    total_on_hand: number;
    profits?: number;
}

export interface NewFinanceData {
    financeSummaries: Finance[]
    id: number | null
    onAddOrEdit: () => void;
    close: () => void;
}

export interface DataTableFinanceData {
    financeSummaries: Finance[]
    getFinanceSummaryId: (id: number) => void
    open: () => void
}

export interface LogoutService {
    logout: () => Promise<{ success: boolean; message: string }>;
}