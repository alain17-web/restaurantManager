import { jwtDecode } from 'jwt-decode'; // A function to decode JWT tokens
import { AuthAction, AuthState, DecodedToken } from "../../types/types.ts";

// Initial authentication state, with no token or decoded token
const initialState: AuthState = {
    token: null,
    decodedToken: null,
};

// authReducer function to handle authentication actions and update state
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            if (action.payload) {
                // If a token is provided, decode the token and update the state
                const decoded = jwtDecode<DecodedToken>(action.payload);
                return { token: action.payload, decodedToken: decoded };
            }
            return state; // If no payload, return current state
        case 'LOGOUT':
            // On logout, clear both token and decoded token
            return { token: null, decodedToken: null };
        default:
            // If the action type is not recognized, throw an error
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

// Export the authReducer function and initialState
export { authReducer, initialState };
