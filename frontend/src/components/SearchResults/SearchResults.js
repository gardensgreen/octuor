import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Player } from "../Player/Player";
import Search from "../Search/Search";

const Main = styled.div`
    display: flex;
    padding: 30px;
    flex-direction: column;
    background-color: #323f4b;
    grid-area: main-view;
    overflow-y: scroll;
    margin-left: 10px;
`;
const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
    margin-right: 20px;
    background-color: rgba(31, 41, 51, 0.57);
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
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
    min-height: 233px;
`;

export default function SearchResults() {
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const history = useHistory();
    const users = useSelector((state) => {
        return state.search.users;
    });

    console.log(users);

    const songs = useSelector((state) => {
        return state.search.songs;
    });

    const term = useSelector((state) => {
        return state.search.term;
    });

    const handleClick = (e, song) => {
        e.preventDefault();
        setCurrentlyPlaying(song);
    };

    return (
        <Main>
            <Section>
                <SectionTitle>Song results for "{term}"</SectionTitle>
                <SectionContent>
                    {songs && songs[0] ? (
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
                                <Artwork src={song.artwork} alt="artwork" />
                                <SongTitle>
                                    {song.title.length > 10
                                        ? song.title.slice(0, 10) + "..."
                                        : song.title}
                                </SongTitle>
                                <SongArtist>{song.User.username}</SongArtist>
                            </Song>
                        ))
                    ) : (
                        <div>No songs</div>
                    )}
                </SectionContent>
            </Section>
            <Section>
                <SectionTitle>Artist results for "{term}"</SectionTitle>
                <SectionContent>
                    {users && users[0] ? (
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
                                        ? user.username.slice(0, 10) + "..."
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
    );
}
