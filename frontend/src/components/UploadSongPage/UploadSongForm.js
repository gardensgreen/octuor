import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSong } from "../../store/song";
import { motion } from "framer-motion";
import Loader from "../Loader/Loader";
import styled from "styled-components";

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
    box-shadow: rgba(149, 157, 165, 0.15) 0px 8px 24px;
    font-size: 0.7rem;
    font-weight: bold;
`;

export default function UploadSongForm(props) {
    const [title, setTitle] = useState("");
    const [audio, setAudio] = useState(null);
    const [loading, setLoading] = useState(null);

    const user = useSelector((state) => {
        return state.session.user;
    });
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(createSong({ title, audio, userId: user.id })).then(() => {
            setTitle("");
            setAudio(null);
            setLoading(false);
        });
    };
    const uploadInput = useRef(null);

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
                <InputContainer>
                    <LabelSpan>Song Title</LabelSpan>
                    <Input
                        type="text"
                        value={title}
                        onChange={updateTitleVal}
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
                    />
                </InputContainer>
                <SubmitButton type="submit">SUBMIT</SubmitButton>
            </StyledForm>
        </div>
    );
}
