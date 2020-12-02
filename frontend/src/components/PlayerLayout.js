import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import SideNav from "./SideNav/SideNav";
import HomePage from "./HomePage/HomePage";

import UploadSongPage from "./UploadSongPage/UploadSongPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import EditSongPage from "./EditSongPage/EditSongPage";

const PageContainer = styled.div`
    min-height: 100%;
    width: 100%;
    height: 100%;
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr auto;
    overflow-x: hidden;
    grid-template-columns: auto auto auto;
    grid-template-areas:
        "side-nav search search"
        "side-nav main-view main-view"
        "side-nav now-playing-bar now-playing-bar";
    background-color: #323f4b;
    align-content: start;
`;

export default function PlayerLayout() {
    // const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    // const [searching, setSearching] = useState(false);
    // const [loading, setLoading] = useState(false);

    const user = useSelector((state) => state.session.user);
    // const term = useSelector((state) => {
    //     return state.search.term;
    // });

    // const history = useHistory();

    // useEffect(() => {
    //     if (term === "") {
    //         setSearching(false);
    //     } else {
    //         setSearching(true);
    //     }

    //     return function cleanup() {
    //         setSearching(false);
    //     };
    // }, [term]);

    // const handleClick = (e, song) => {
    //     e.preventDefault();
    //     setCurrentlyPlaying(song);
    // };

    return (
        <>
            <PageContainer>
                <SideNav userId={user && user.id}></SideNav>
                <Switch>
                    <Route path="/home">
                        <HomePage></HomePage>
                    </Route>
                    <Route path="/songs/new">
                        <UploadSongPage />
                    </Route>
                    <Route path="/users/:userId">
                        <ProfilePage />
                    </Route>
                    <Route path="/users/:userId">
                        <ProfilePage />
                    </Route>
                    <Route path="/songs/:songId/edit">
                        <EditSongPage />
                    </Route>
                </Switch>
            </PageContainer>
        </>
    );
}
