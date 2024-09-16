
import { NotifAction, NotifState } from "../../types/types.ts";

// Initial state for notifications, starting with 0 counts
const initialState: NotifState = {
    orderCount: 0,
    purchaseCount: 0,
    bookingCount: 0,
};

// Reducer function to handle different notification actions
const notifReducer = (state: NotifState, action: NotifAction): NotifState => {
    switch (action.type) {
        case 'ADD_ORDER_NOTIF':
            // Increment the orderCount by 1
            return { ...state, orderCount: state.orderCount + 1 };
        case 'ADD_PURCHASE_NOTIF':
            // Increment the purchaseCount by 1
            return { ...state, purchaseCount: state.purchaseCount + 1 };
        case 'ADD_BOOKING_NOTIF':
            // Increment the bookingCount by 1
            return { ...state, bookingCount: state.bookingCount + 1 };
        case 'RESET_ORDER_NOTIF':
            // Reset the orderCount to 0
            return { ...state, orderCount: 0 };
        case 'RESET_PURCHASE_NOTIF':
            // Reset the purchaseCount to 0
            return { ...state, purchaseCount: 0 };
        case 'RESET_BOOKING_NOTIF':
            // Reset the bookingCount to 0
            return { ...state, bookingCount: 0 };
        default:
            // Return the current state for any unrecognized action
            return state;
    }
};


export { notifReducer, initialState };
