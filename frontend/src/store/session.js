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

const destroySession = () => {
    return {
        type: DESTROY_SESSION,
    };
};

export const loginUser = ({ credential, password }) => async (dispatch) => {
    const res = await fetch("/api/session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential, password }),
    });

    const { user } = res.data;

    dispatch(setSession(user));

    return {
        type: LOGIN_USER,
        payload: user,
    };
};

export const restoreUser = () => async (dispatch) => {
    const res = await fetch("/api/session");
    dispatch(setSession(res.data.user));
    return res;
};

export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
    dispatch(setSession(response.data.user));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await fetch("/api/session", {
        method: "DELETE",
    });
    dispatch(destroySession());
    return response;
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
