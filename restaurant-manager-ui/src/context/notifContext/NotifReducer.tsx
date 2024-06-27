import {NotifAction, NotifState} from "../../types/types.ts";


const initialState: NotifState = {
    orderCount: 0,
    purchaseCount: 0,
    bookingCount: 0,
}

const notifReducer = (state: NotifState, action: NotifAction): NotifState => {
    switch (action.type) {
        case 'ADD_ORDER_NOTIF':
            return {...state, orderCount:state.orderCount + 1};
        case 'ADD_PURCHASE_NOTIF':
            return {...state, purchaseCount:state.purchaseCount + 1};
        case 'ADD_BOOKING_NOTIF':
            return {...state, bookingCount:state.bookingCount + 1};
        case 'RESET_ORDER_NOTIF':
            return {...state, orderCount: state.orderCount - 1};
        case 'RESET_PURCHASE_NOTIF':
            return {...state, purchaseCount: state.purchaseCount - 1};
        case 'RESET_BOOKING_NOTIF' :
            return {...state, bookingCount: state.bookingCount - 1};
        default:
            return state;
    }
}

export {notifReducer,initialState};