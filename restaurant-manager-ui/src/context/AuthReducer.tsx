
import {jwtDecode} from 'jwt-decode';
import {AuthAction, AuthState, DecodedToken} from "../types/types.ts";


const initialState: AuthState = {
    token: null,
    decodedToken: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            if (action.payload) {
                const decoded = jwtDecode<DecodedToken>(action.payload);
                return { token: action.payload, decodedToken: decoded };
            }
            return state;
        case 'LOGOUT':
            return { token: null, decodedToken: null };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export { authReducer, initialState };


