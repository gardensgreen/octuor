import axios from "axios";

export const RECEIVE_SONG = "RECEIVE_SONG";

export const createSong = (song) => (dispatch) => {
    const { audio, title, userId } = song;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("userId", parseInt(userId, 10));

    // for multiple files

    // for single file

    if (audio) formData.append("audio", audio);

    const config = {
        headers: {
            "content-type": "multipart/form-data",
        },
    };

    return axios.post("/api/songs", formData, config).then((res) => {
        console.log(res);
        const song = res.data;
        return dispatch({ type: RECEIVE_SONG, song });
    });
};
