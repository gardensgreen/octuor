import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSong } from "../../store/song";

export default function UploadSongForm(props) {
    const [title, setTitle] = useState("");
    const [audio, setAudio] = useState(null);
    const [loading, setLoading] = useState(false);

    const user = useSelector((state) => {
        return state.session.user;
    });
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(createSong({ title, audio, userId: user.id })).then(() => {
            setTitle("");
            setAudio(null);
            setLoading(false);
        });
    };

    const updateFile = (e) => {
        const {
            target: {
                validity,
                files: [file],
            },
        } = e;
        return validity.valid && setAudio(file);
    };

    const updateTitleVal = (e) => setTitle(e.target.value);

    if (loading) return <span>Loading...</span>;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={updateTitleVal}
                    />
                </label>
                <label>
                    Single Upload
                    <input type="file" name="audio" onChange={updateFile} />
                </label>
                <input type="submit" value="Create" />
            </form>
        </div>
    );
}
