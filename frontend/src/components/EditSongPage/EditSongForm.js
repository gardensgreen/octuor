import { useState, useRef, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import styled from "styled-components";
import fetch from "../../store/csrf";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputContainer = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    width: 100%;
`;

const LabelSpan = styled.span`
    color: #9ea5ad;
    margin-bottom: 10px;
    font-size: 0.7rem;
`;

const Input = styled.input`
    width: 400px;
    background-color: #52606d;
    border: 0.5px solid #616e7c;
    height: 33.33px;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    color: #f5f7f9;
`;

const SubmitButton = styled.button`
    margin-top: 20px;
    background-color: #a239a0;
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
    width: 100%;
    transition: background-color 0.5s;
    transition-timing-function: ease-in-out;
    &:hover {
        background-color: #c054be;
    }
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const UploadDisplay = styled.div`
    visibility: hidden;
    display: none;
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

const UploadText = styled.span`
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
const UploadButton = styled.img`
    margin-top: 20px;
    width: 200px;
    letter-spacing: 0.1rem;
    color: #f5f7f9;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    font-size: 0.7rem;
    font-weight: bold;
    &:hover ${UploadDisplay} {
        visibility: visible;
        display: flex;
    }
`;

const DividerContainer = styled.div`
    width: 400px;
    margin-top: 20px;
    margin-bottom: 10px;
`;

const Divider = styled.div`
    border-top: 1px solid #9ea5ad;
    display: block;
    line-height: 1px;
    margin: 15px 0;
    position: relative;
    text-align: center;
`;

const DividerTitle = styled.strong`
    background-color: #323f4b;
    font-size: 12px;
    letter-spacing: 1px;
    padding: 0 20px;
    color: #9ea5ad;
    text-transform: uppercase;
`;

export default function EditSongForm() {
    const [title, setTitle] = useState("");
    const [artwork, setArtwork] = useState(null);

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    const user = useSelector((state) => {
        return state.session.user;
    });
    const history = useHistory();
    const { songId } = useParams();

    useEffect(() => {
        const getSong = async (songId) => {
            try {
                setLoading(true);
                const res = await fetch(`/api/songs/${songId}`);
                const song = res.data;

                if (song && song.userId === user.id) {
                    setArtwork(song.artwork);
                    setTitle(song.title);
                    setLoading(false);
                } else {
                    history.push(`/`);
                }
            } catch (err) {
                setLoading(false);
                if (err.data) {
                    setErrors([...errors, err.data.message]);
                }
            }
        };
        getSong(songId);

        return () => {};
    }, [songId]);

    useEffect(() => {
        const updateSong = async (songId) => {
            try {
                setImageLoading(true);
                const formData = new FormData();
                formData.append("title", title);
                if (artwork) formData.append("artwork", artwork);
                // console.log(formData.get("audio"));
                const res = await fetch(`/api/songs/${songId}`, {
                    method: "PUT",
                    body: formData,
                });
                const song = res.data;
                setArtwork(song.artwork);
                setImageLoading(false);
            } catch (err) {
                setImageLoading(false);
                setErrors(...errors, [err.data.message]);
            }
        };
        if (artwork && artwork.name) {
            updateSong(songId);
        }

        return function cleanup() {};
    }, [artwork]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", title);
            if (artwork) formData.append("artwork", artwork);
            // console.log(formData.get("audio"));
            const res = await fetch(`/api/songs/${songId}`, {
                method: "PUT",
                body: formData,
            });
            const song = res.data;
            if (song) history.push(`/users/${user.id}`);
        } catch (err) {
            setLoading(true);
            setErrors([err.data.message]);
        }
    };
    const uploadInput = useRef(null);

    const handleClick = (e) => {
        uploadInput.current.click();
    };

    const updateFile = (e) => {
        const {
            target: {
                validity,
                files: [file],
            },
        } = e;

        return validity.valid && setArtwork(file);
    };

    const updateTitleVal = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    };

    if (!user) return <Redirect to="/login" />;
    if (loading) return <Loader style={{ marginTop: 200 }} />;

    return (
        <div>
            <StyledForm onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <InputContainer>
                    <LabelSpan>Song Artwork</LabelSpan>
                    <ImageContainer>
                        {imageLoading ? (
                            <Loader />
                        ) : (
                            <>
                                <UploadDisplay>
                                    <UploadText>Upload</UploadText>
                                </UploadDisplay>
                                <UploadButton
                                    src={artwork}
                                    onClick={handleClick}
                                />
                            </>
                        )}
                    </ImageContainer>
                </InputContainer>
                <DividerContainer>
                    <Divider>
                        <DividerTitle>Details</DividerTitle>
                    </Divider>
                </DividerContainer>
                <InputContainer>
                    <LabelSpan>Song Title</LabelSpan>
                    <Input
                        type="text"
                        value={title}
                        onChange={updateTitleVal}
                        required
                    />
                </InputContainer>

                <InputContainer>
                    <input
                        ref={uploadInput}
                        style={{ display: "none" }}
                        type="file"
                        name="artwork"
                        onChange={updateFile}
                    />
                </InputContainer>
                <SubmitButton type="submit">SHARE</SubmitButton>
            </StyledForm>
        </div>
    );
}
