import { useEffect, useState } from "react";

import fetch from "../../store/csrf";

export default function MyProfile({ user }) {
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchMySongs = async ({ id }) => {
            try {
                setLoading(false);
                const res = await fetch(`/api/profiles/${id}`);

                const songs = res.data;
                if (songs) setSongs(songs);
                setLoading(true);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMySongs(user);
    }, []);

    return (
        <div>
            {songs[0] ? (
                songs.map((song) => <div key={song.id}>{song.title}</div>)
            ) : (
                <div>No songs</div>
            )}
        </div>
    );
}
