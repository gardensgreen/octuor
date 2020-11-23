import React from "react";
import EditSongForm from "./EditSongForm";
import styled from "styled-components";

export default function EditSongPage({ song }) {
    const PageContainer = styled.div`
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 400px;
    `;

    const PageTitle = styled.h1`
        display: inline;
        font-size: 0.7rem;
        margin-top: 40px;
        margin-bottom: 15px;
        color: #f5f7f9;
    `;
    return (
        <PageContainer>
            <PageTitle>Edit your song's details to share it.</PageTitle>
            <EditSongForm song={song} />
        </PageContainer>
    );
}
