import fetch from "./csrf";

const LOGIN_USER = "LOGIN_USER";
const SET_SESSION = "SET_SESSION";
const DESTROY_SESSION = "DESTROY_SESSION";

const setSession = (user) => {
    return {
        type: SET_SESSION,
        payload: user,
    };
};

export const loginUser = ({ credential, password }) => async (dispatch) => {
    try {
        const res = await fetch("/api/session", {
            method: "POST",
            body: JSON.stringify({ credential, password }),
        });

        const { user } = res.data;

        dispatch(setSession(user));

        return {
            type: LOGIN_USER,
            payload: user,
        };
    } catch (err) {
        console.error(err);
    }
};

const destroySession = () => {
    return {
        type: DESTROY_SESSION,
    };
};

const sessionReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_SESSION:
            return { ...state, user: action.payload };
        case DESTROY_SESSION:
            return { ...state, user: null };
        default:
            return state;
    }
};

export default sessionReducer;
