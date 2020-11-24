import { useState, useRef, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
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
    box-shadow: rgba(149, 157, 165, 0.15) 0px 8px 24px;
    color: #f5f7f9;
`;

const SubmitButton = styled.button`
    margin-top: 20px;
    background-color: #c054eb;
    border: 0px;
    height: 33.33px;
    letter-spacing: 0.1rem;
    color: #f5f7f9;
    border-radius: 50px;
    box-shadow: rgba(149, 157, 165, 0.15) 0px 8px 24px;
    font-size: 0.7rem;
    font-weight: bold;
    width: 100%;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const UploadButton = styled.img`
    margin-top: 20px;
    width: 200px;
    letter-spacing: 0.1rem;
    color: #f5f7f9;
    border-radius: 3px;
    box-shadow: rgba(149, 157, 165, 0.15) 0px 8px 24px;
    font-size: 0.7rem;
    font-weight: bold;
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
                    history.push("/");
                }
            } catch (err) {
                console.error(err);
            }

            return () => {};
        };
        getSong(songId);
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
                console.error(err);
            }
        };
        if (artwork && artwork.name) {
            updateSong(songId);
        }
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
            if (song) history.push(`/`);
        } catch (err) {
            console.error(err);
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
                            <UploadButton src={artwork} onClick={handleClick} />
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
