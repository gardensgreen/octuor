import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import styled from "styled-components";

import fetch from "../../store/csrf";
import Loader from "../Loader/Loader";
import { Player } from "../Player/Player";
import Search from "../Search/Search";
import SearchResults from "../SearchResults/SearchResults";

//Styles

const Main = styled.div`
    display: flex;
    padding: 30px;
    flex-direction: column;
    background-color: #323f4b;
    grid-area: main-view;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-left: 10px;
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

const PlayText = styled.span`
    z-index: 4;
    background-color: transparent;
    border: 0px;
    margin-top: -30px;
    height: 33.33px;
    width: 60%;
    letter-spacing: 0.1rem;
    color: #f5f7f9;
    border-radius: 50px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    font-size: 0.7rem;
    transition: background-color 0.3s;
    transition-timing-function: ease-in-out;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        cursor: pointer;
    }
`;
const PlayDisplay = styled.div`
    visibility: hidden;
    display: none;
    top: 0;
    right: 0;
    background-color: transparent;
    justify-content: center;
    padding: 0;
    left: 0;
    transition: background-color 0.3s;
    transition-timing-function: ease-in-out;
    border-radius: 3px;
    min-height: 100%;
    min-width: 100%;
    align-items: center;
    position: absolute;

    color: #f5f7f9;

    &:hover ${PlayText} {
        background-color: #c054eb;
    }
    &:hover {
        background-color: rgba(61, 81, 102, 0.8);
    }
`;

const Song = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin-right: 20px;
    background-color: rgba(31, 41, 51, 0.57);
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    position: relative;
    transition: background-color 0.5s ease-in;
    &:hover ${PlayDisplay} {
        visibility: visible;
        display: flex;
    }
`;

const Artwork = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 10px;
    padding: 5px;
`;

const SongTitle = styled.h2`
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-top: 14px;
    margin-bottom: 4px;
    width: 100px;
    color: #f5f7f9;
    z-index: 4;
`;
const SongArtist = styled.h2`
    display: block;
    font-size: 10px;
    z-index: 4;
    color: #9ea5ad;
`;

const User = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin-right: 20px;
    background-color: rgba(31, 41, 51, 0.57);
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    &:hover {
        cursor: pointer;
    }
`;
const UserImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 100px;
    padding: 5px;
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
    //State
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [loading, setLoading] = useState(false);
    const [songs, setSongs] = useState([]);
    const [users, setUsers] = useState([]);
    const [searching, setSearching] = useState(false);

    //Map State to props
    const user = useSelector((state) => {
        return state.session.user;
    });

    const term = useSelector((state) => {
        return state.search.term;
    });

    const history = useHistory();

    //onRe-render
    useEffect(() => {
        if (term === "") {
            setSearching(false);
        } else {
            setSearching(true);
        }

        return function cleanup() {
            setSearching(false);
        };
    }, [term]);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/songs`);
                const songs = res.data;
                if (songs) setSongs(songs);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSongs();

        return function cleanup() {
            setSongs([]);
        };
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/users`);

                const users = res.data;

                if (users) setUsers(users);

                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsers();
        return function cleanup() {
            setUsers([]);
        };
    }, []);

    //Authorization
    if (!user) {
        return <Redirect to="/login" />;
    }

    //Event Handlers
    const handleClick = (e, song) => {
        e.preventDefault();
        setCurrentlyPlaying(song);
    };

    return (
        <>
            <Search></Search>

            {term && searching ? (
                <SearchResults setCurrentlyPlaying={setCurrentlyPlaying} />
            ) : (
                <Main>
                    <Section>
                        <SectionTitle>Trending Songs</SectionTitle>
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
                                        <PlayDisplay>
                                            <PlayText>PLAY</PlayText>
                                        </PlayDisplay>
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
                        <SectionTitle>Hot Artists</SectionTitle>
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
                                            {user.username.length > 20
                                                ? user.username.slice(0, 20) +
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
            )}

            {currentlyPlaying ? (
                <Player
                    streamUrl={currentlyPlaying.audio}
                    trackTitle={currentlyPlaying.title}
                    preloadType="auto"
                />
            ) : null}
        </>
    );
}
