import React from "react";
import EditSongForm from "./EditSongForm";
import styled from "styled-components";

export default function EditSongPage({ song }) {
    const PageContainer = styled.div`
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
        <PageContainer>
            <PageTitle>Edit your song's details to share it.</PageTitle>
            <EditSongForm />
        </PageContainer>
    );
}
