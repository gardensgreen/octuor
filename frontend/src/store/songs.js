import fetch from "./csrf";

const GET_SONGS = "SET_SONGS";

const getSongs = (songs) => {
    return {
        type: GET_SONGS,
        payload: songs,
    };
};

export const fetchSongs = () => async (dispatch) => {
    try {
        const res = await fetch("/api/songs");

        const songs = res.data;
        console.log(res.data);
        dispatch(getSongs(songs));
    } catch (err) {
        console.error(err);
    }
};

const songsReducer = (state = [], action) => {
    switch (action.type) {
        case GET_SONGS:
            return [...state, action.payload];
        default:
            return state;
    }
};

export default songsReducer;
