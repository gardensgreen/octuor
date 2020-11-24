import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import fetch from "../../store/csrf";
import Loader from "../Loader/Loader";
import { Player } from "../Player/Player";

const PageContainer = styled.div`
    min-height: 100%;
    width: 100%;
    height: 100%;
    position: relative;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: auto;
    grid-template-areas:
        "main-view main-view main-view"
        "now-playing-bar now-playing-bar now-playing-bar";
    background-color: #323f4b;
`;
const Main = styled.div`
    display: flex;
    padding: 30px;
    flex-direction: column;
    background-color: #323f4b;
    grid-area: main-view;
    overflow-y: scroll;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;

    margin: 0;
`;

const SectionTitle = styled.h2`
    display: block;
    font-size: 20px;
    line-height: 64px;

    color: #f5f7f9;
`;

const Song = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin-right: 10px;
    background-color: rgba(31, 41, 51, 0.57);
    border-radius: 3px;
`;

const User = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin-right: 10px;
    background-color: rgba(31, 41, 51, 0.57);
    border-radius: 3px;
`;

const Artwork = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 3px;
`;

const UserImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 75px;
`;

const SongTitle = styled.h2`
    display: block;
    font-size: 14px;
    margin-top: 14px;
    margin-bottom: 4px;
    width: 100px;
    color: #f5f7f9;
`;

const SongArtist = styled.h2`
    display: block;
    font-size: 10px;

    color: #9ea5ad;
`;

const SectionContent = styled.div`
    width: 85vw;
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    flex-direction: row;
    margin-bottom: 0px;
`;

export default function ProfilePage() {
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [loading, setLoading] = useState(false);
    const [songs, setSongs] = useState([]);
    const [users, setUsers] = useState([]);
    const user = useSelector((state) => {
        return state.session.user;
    });
    const history = useHistory();

    if (!user) {
        history.push("/login");
    }

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/songs`);
                console.log(res);
                const songs = res.data;

                if (songs) setSongs(songs);

                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSongs();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/users`);
                console.log(res);
                const users = res.data;

                if (users) setUsers(users);

                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsers();
    }, []);

    const handleClick = (e, song) => {
        e.preventDefault();
        setCurrentlyPlaying(song);
    };

    return (
        <>
            <PageContainer>
                <Main>
                    <Section>
                        <SectionTitle>Newest Songs</SectionTitle>
                        <SectionContent>
                            {loading ? (
                                <Loader></Loader>
                            ) : songs[0] ? (
                                songs.map((song) => (
                                    <Song
                                        onClick={(e) =>
                                            handleClick(e, {
                                                audio: song.audio,
                                                title: song.title,
                                                artwork: song.artwork,
                                            })
                                        }
                                        key={song.id}
                                    >
                                        <Artwork
                                            src={song.artwork}
                                            alt="artwork"
                                        />
                                        <SongTitle>
                                            {song.title.length > 10
                                                ? song.title.slice(0, 10) +
                                                  "..."
                                                : song.title}
                                        </SongTitle>
                                        <SongArtist>
                                            {song.User.username}
                                        </SongArtist>
                                    </Song>
                                ))
                            ) : (
                                <div>No songs</div>
                            )}
                        </SectionContent>
                    </Section>
                    <Section>
                        <SectionTitle>Hottest Artists</SectionTitle>
                        <SectionContent>
                            {loading ? (
                                <Loader></Loader>
                            ) : users[0] ? (
                                users.map((user) => (
                                    <User
                                        onClick={(e) => {
                                            e.preventDefault();
                                            history.push(`/users/${user.id}`);
                                        }}
                                        key={user.id}
                                    >
                                        <UserImage
                                            src={
                                                window.location.origin +
                                                "/artworkPlaceholder.png"
                                            }
                                            alt="avatar"
                                        />
                                        <SongTitle>
                                            {" "}
                                            {user.username.length > 10
                                                ? user.username.slice(0, 10) +
                                                  "..."
                                                : user.username}
                                        </SongTitle>
                                    </User>
                                ))
                            ) : (
                                <div>No users</div>
                            )}
                        </SectionContent>
                    </Section>
                </Main>
                {currentlyPlaying ? (
                    <Player
                        streamUrl={currentlyPlaying.audio}
                        trackTitle={currentlyPlaying.title}
                        preloadType="auto"
                    />
                ) : null}
            </PageContainer>
        </>
    );
}
