import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import MyProfile from "./MyProfile";
import OtherProfile from "./OtherProfile";

const PageContainer = styled.div`
    min-height: 100%;
    width: 100%;
    height: 100%;
    position: relative;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: auto;
    grid-template-areas:
        "main-view main-view main-view"
        "now-playing-bar now-playing-bar now-playing-bar";
    background-color: #323f4b;
`;

export default function ProfilePage() {
    const user = useSelector((state) => {
        return state.session.user;
    });
    const { userId } = useParams();
    const history = useHistory();

    if (!user) {
        history.push("/login");
        return null;
    } else if (user.id === parseInt(userId, 10)) {
        return (
            <PageContainer>
                <MyProfile userId={userId}></MyProfile>
            </PageContainer>
        );
    } else {
        return (
            <PageContainer>
                <OtherProfile userId={userId}></OtherProfile>
            </PageContainer>
        );
    }
}
