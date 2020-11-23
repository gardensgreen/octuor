import axios from "axios";

export const RECEIVE_SONG = "RECEIVE_SONG";

export const createSong = (song) => (dispatch) => {
    const { audio, title, userId, artwork } = song;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("userId", parseInt(userId, 10));
    formData.append("artwork", artwork);
    // for multiple files

    // for single file

    if (audio) formData.append("audio", audio);

    const config = {
        headers: {
            "content-type": "multipart/form-data",
        },
    };

    return axios.post("/api/songs", formData, config).then((res) => {
        console.log(res.data);
        const song = res.data;
        return dispatch({ type: RECEIVE_SONG, payload: song });
    });
};

const songReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_SONG:
            return { ...state, song: action.payload };
        default:
            return state;
    }
};

export default songReducer;
