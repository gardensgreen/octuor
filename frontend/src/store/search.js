import fetch from "./csrf";

const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
const REMOVE_SEARCH_RESULTS = "REMOVE_SEARCH_RESULTS";

const setSearchResults = (searchResults) => {
    return {
        type: SET_SEARCH_RESULTS,
        payload: searchResults,
    };
};
export const removeSearchResults = () => {
    return {
        type: REMOVE_SEARCH_RESULTS,
    };
};

export const getSearchResults = (term) => async (dispatch) => {
    const res = await fetch("/api/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ term }),
    });

    const searchResults = res.data;
    console.log(res.data);
    dispatch(setSearchResults({ ...searchResults, term }));
};

const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_SEARCH_RESULTS:
            return {
                ...state,
                songs: action.payload.songs,
                users: action.payload.users,
                term: action.payload.term,
            };
        case REMOVE_SEARCH_RESULTS:
            return { ...state, songs: null, users: null, term: "" };
        default:
            return state;
    }
};

export default searchReducer;
