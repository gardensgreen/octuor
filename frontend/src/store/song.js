import fetch from "./csrf";

export const RECEIVE_SONG = "RECEIVE_SONG";

export const createSong = (song) => async (dispatch) => {
    const { imageUrl, audioUrl, title, userId } = song;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("userId", userId);

    if (imageUrl) formData.append("imageUrl", imageUrl);
    if (audioUrl) formData.append("imageUrl", imageUrl);

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
        method: "POST",
    };
    try {
        const res = await fetch("/api/songs", config);

        const { song } = res.data;

        dispatch({
            type: RECEIVE_SONG,
            song,
        });
    } catch (err) {
        console.error(err);
    }
};
