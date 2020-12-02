import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import styled from "styled-components";
import MyProfile from "./MyProfile";
import OtherProfile from "./OtherProfile";

const PageContainer = styled.div`
    grid-area: main-view;
`;

export default function ProfilePage() {
    const user = useSelector((state) => {
        return state.session.user;
    });
    const { userId } = useParams();

    if (!user) {
        return <Redirect to="/login" />;
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
