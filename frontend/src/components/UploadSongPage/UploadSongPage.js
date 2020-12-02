import React from "react";
import UploadSongForm from "./UploadSongForm";
import styled from "styled-components";
import SideNav from "../SideNav/SideNav";
import { useSelector } from "react-redux";

export default function UploadSongPage() {
    const user = useSelector((state) => state.session.user);
    const Main = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 400px;
        grid-area: main-view;

        margin: 0 auto;
    `;

    const PageTitle = styled.h1`
        display: inline;
        font-size: 0.7rem;
        margin-top: 40px;
        margin-bottom: 15px;
        color: #f5f7f9;
    `;
    return (
        <Main>
            <PageTitle>Upload your song!</PageTitle>
            <UploadSongForm />
        </Main>
    );
}
