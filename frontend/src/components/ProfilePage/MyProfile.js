import { useEffect, useState } from "react";
import styled from "styled-components";
import fetch from "../../store/csrf";

import "./Profile.css";

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
    height: 100%;
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

const Song = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: rgba(31, 41, 51, 0.57);
    border-radius: 3px;
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
    display: flex;
    flex-direction: row;
    margin-bottom: 0px;
`;

export default function MyProfile({ userId }) {
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [songs, setSongs] = useState([]);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchMySongs = async (userId) => {
            try {
                setLoading(false);
                const res = await fetch(`/api/profiles/${userId}`);

                const songs = res.data;

                if (songs) setSongs(songs);

                if (songs[0].User) setProfile(songs[0].User);

                setLoading(true);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMySongs(userId);
    }, []);

    return (
        <>
            <Header>
                <Avatar
                    src={window.location.origin + "/artworkPlaceholder.png"}
                />
                <ProfileDetail>
                    <ProfileName>{profile.username}</ProfileName>
                    <ProfileExtra>{songs.length} uploaded songs</ProfileExtra>
                </ProfileDetail>
            </Header>
            <Main>
                <Section>
                    <SectionTitle>Uploaded Songs</SectionTitle>
                    <SectionContent>
                        {songs[0] ? (
                            songs.map((song) => (
                                <Song key={song.id}>
                                    <Artwork src={song.artwork} alt="artwork" />
                                    <SongTitle>{song.title}</SongTitle>
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
            </Main>
        </>
    );
}
