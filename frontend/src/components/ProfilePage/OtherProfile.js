import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import fetch from "../../store/csrf";

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
    margin-bottom: 20px;
    margin-top: 20px;
    color: #f5f7f9;
`;

const ProfileExtra = styled.h3`
    display: block;
    font-size: 12px;

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
    margin-bottom: 0px;
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

const Song = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: rgba(31, 41, 51, 0.57);
    border-radius: 3px;
    margin-right: 20px;
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
    flex-wrap: row;
    margin-bottom: 0px;
`;

const EditButton = styled(NavLink)`
    margin-top: 20px;
    background-color: #c054eb;
    border: 0px;
    width: 200px;
    height: 33.33px;
    letter-spacing: 0.1rem;
    color: #f5f7f9;
    border-radius: 50px;
    box-shadow: rgba(149, 157, 165, 0.15) 0px 8px 24px;
    font-size: 0.7rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function OtherProfile({ userId }) {
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
