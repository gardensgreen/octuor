import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import fetch from "../../store/csrf";
import Loader from "../Loader/Loader";
import { Player } from "../Player/Player";
import "./Profile.css";

const ProfileContainer = styled.div`
    grid-area: main-view;
    overflow-y: scroll;
`;
const Header = styled.div`
    display: flex;

    background: #3e4c59;
    padding: 30px;
`;

const ProfileDetail = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 20px;
`;

const ProfileName = styled.h2`
    display: block;
    font-size: 90px;

    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    color: #f5f7f9;
`;

const ProfileExtra = styled.h3`
    display: block;
    font-size: 12px;
    margin-top: 20px;
    margin-left: 20px;
    color: #9ea5ad;
`;

const Avatar = styled.img`
    width: 225px;
    height: 225px;
    border-radius: 125px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const Main = styled.div`
    display: flex;
    padding: 30px;
    flex-direction: column;
    background-color: #323f4b;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

const SectionTitle = styled.h2`
    display: block;
    font-size: 20px;
    line-height: 64px;

    color: #f5f7f9;
`;

const PlayDisplay = styled.div`
    visibility: hidden;
    display: none;
    display: flex;
    background-color: rgba(31, 41, 51, 0.8);
    justify-content: center;
    padding: 0;
    left: 0;
    transition: visibility 0.1s ease-in;
    min-height: 100%;
    min-width: 100%;
    align-items: center;
    position: absolute;
    margin-right: 20px;
    color: #f5f7f9;
`;
const PlayText = styled.span`
    background-color: #c054eb;
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
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        cursor: pointer;
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
    &:hover ${PlayDisplay} {
        visibility: visible;
        display: flex;
    }
`;

const Artwork = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 3px;
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

const ActionContainer = styled.div`
    margin-top: 10px;
    display: flex;
    background-color: #32;
    padding-bottom: 10px;
`;

const EditSongButton = styled(NavLink)`
    background-color: #323f4b;
    border: 0px;
    height: 33.33px;
    letter-spacing: 0.1rem;
    color: #f5f7f9;
    border-radius: 50px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    font-size: 0.7rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    width: 50px;
    height: 10px;
    z-index: 3;
`;

const DeleteSongButton = styled.button`
    background-color: #c054eb;
    border: 0px;
    height: 33.33px;
    letter-spacing: 0.1rem;
    color: #f5f7f9;
    border-radius: 50px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    font-size: 0.7rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 50px;
    height: 10px;
    z-index: 3;
`;

const NotFound = styled.div`
    display: flex;
    flex-direction: column;
`;

const NotFoundTitle = styled.h2`
    display: block;
    font-size: 17px;
    line-height: 17px;
    text-align: left;
    color: #9ea5ad;
`;

const NotFoundDescription = styled.h3`
    display: block;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #9ea5ad;
`;

export default function MyProfile({ userId }) {
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [loading, setLoading] = useState(false);
    const [songs, setSongs] = useState([]);
    const [profile, setProfile] = useState({});
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchMySongs = async (userId) => {
            try {
                setLoading(true);
                const res = await fetch(`/api/profiles/${userId}`);

                const songs = res.data;

                if (songs) setSongs(songs);

                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMySongs(userId);

        return function cleanup() {
            setSongs([]);
        };
    }, [userId]);

    useEffect(() => {
        const fetchUser = async (userId) => {
            try {
                setLoading(true);
                const res = await fetch(`/api/users/${userId}`);

                const user = res.data;

                if (user) setUser(user);

                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser(userId);

        return function cleanup() {
            setUser(null);
        };
    }, [userId]);

    const handleClick = (e, song) => {
        e.preventDefault();
        setCurrentlyPlaying(song);
    };

    const handleDelete = async (e, songId) => {
        e.preventDefault();
        const res = await fetch(`/api/songs/${songId}`, {
            method: "DELETE",
        });

        if (res && res.data) {
            setSongs(
                songs.filter((song) => {
                    return song !== res.data;
                })
            );
        }
    };

    return (
        <>
            <ProfileContainer>
                <Header>
                    <Avatar
                        src={window.location.origin + "/artworkPlaceholder.png"}
                    />
                    <ProfileDetail>
                        <ProfileName>
                            {user ? user.username : loading}
                        </ProfileName>
                        <ProfileExtra>
                            {songs.length} uploaded songs
                        </ProfileExtra>
                    </ProfileDetail>
                </Header>
                <Main>
                    <Section>
                        <SectionTitle>Uploaded Songs</SectionTitle>
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
                                        <ActionContainer>
                                            <EditSongButton
                                                to={`/songs/${song.id}/edit`}
                                            >
                                                ...
                                            </EditSongButton>
                                            <DeleteSongButton
                                                onClick={(e) =>
                                                    handleDelete(e, song.id)
                                                }
                                            >
                                                Del
                                            </DeleteSongButton>
                                        </ActionContainer>
                                    </Song>
                                ))
                            ) : (
                                <NotFound>
                                    <NotFoundTitle>
                                        No Uploaded Songs
                                    </NotFoundTitle>
                                    <NotFoundDescription>
                                        Click on the menu button in the upper
                                        right hand side to share the love.
                                    </NotFoundDescription>
                                </NotFound>
                            )}
                        </SectionContent>
                    </Section>
                </Main>
            </ProfileContainer>
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
