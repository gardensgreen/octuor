import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import Loader from "../Loader/Loader";
import styled from "styled-components";
import fetch from "../../store/csrf";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
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
    transition: background-color 0.5s;
    transition-timing-function: ease-in-out;
    &:hover {
        background-color: #c054be;
    }
`;

const UploadButton = styled.div`
    padding: 10px;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-top: 20px;
    background-color: #00a3bf;
    border: 0px;
    height: 33.33px;
    letter-spacing: 0.1rem;
    color: #f5f7f9;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    font-size: 0.7rem;
    font-weight: bold;
    transition: background-color 0.5s;
    transition-timing-function: ease-in-out;
    &:hover {
        background-color: #00b8d9;
    }
`;

export default function UploadSongForm(props) {
    const [title, setTitle] = useState("");
    const [audio, setAudio] = useState(null);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(null);

    const user = useSelector((state) => {
        return state.session.user;
    });

    const history = useHistory();
    const uploadInput = useRef(null);

    if (!user) return <Redirect to="/login" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("userId", parseInt(user.id, 10));
            formData.append(
                "artwork",
                window.location.origin + "/artworkPlaceholder.png"
            );

            if (audio) formData.append("audio", audio);
            // console.log(formData.get("audio"));
            const res = await fetch("/api/songs", {
                method: "POST",
                body: formData,
            });

            const song = res.data;

            if (song) history.push(`/songs/${song.id}/edit`);
        } catch (err) {
            setLoading(false);
            setErrors([err.data.message]);
        }
    };

    const handleClick = (e) => {
        uploadInput.current.click();
    };

    const updateFile = (e) => {
        e.preventDefault();
        const {
            target: {
                validity,
                files: [file],
            },
        } = e;
        return validity.valid && setAudio(file);
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
                    <LabelSpan>Song Title</LabelSpan>
                    <Input
                        type="text"
                        value={title}
                        onChange={updateTitleVal}
                        required
                    />
                </InputContainer>
                <UploadButton onClick={handleClick}>
                    {audio ? audio.name : "UPLOAD SONG"}
                </UploadButton>
                <InputContainer>
                    <input
                        ref={uploadInput}
                        style={{ display: "none" }}
                        type="file"
                        name="audio"
                        onChange={updateFile}
                        required
                    />
                </InputContainer>
                <SubmitButton type="submit">SUBMIT</SubmitButton>
            </StyledForm>
        </div>
    );
}
