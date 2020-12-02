import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage/LandingPage";
import SignupFormPage from "./components/SignUpFormPage/SignUpFormPage";
import LoginFormPage from "./components/LoginFormPage/LoginFormPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import UploadSongPage from "./components/UploadSongPage/UploadSongPage";
import EditSongPage from "./components/EditSongPage/EditSongPage";
import HomePage from "./components/HomePage/HomePage";

import * as sessionActions from "./store/session";
import Layout from "./components/Layout";
import SignUpFormPage from "./components/SignUpFormPage/SignUpFormPage";
import PlayerLayout from "./components/PlayerLayout";

const RootContainer = styled.div`
    background-color: #323f4b;
    height: 100vh;
`;

function Root() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <RootContainer>
            {isLoaded && (
                <>
                    <Switch>
                        <Route exact path="/">
                            <Navigation isLoaded={isLoaded}></Navigation>
                            <LandingPage></LandingPage>
                        </Route>
                        <Route path="/login">
                            <Navigation isLoaded={isLoaded}></Navigation>
                            <LoginFormPage></LoginFormPage>
                        </Route>
                        <Route path="/signup">
                            <Navigation isLoaded={isLoaded}></Navigation>
                            <SignUpFormPage></SignUpFormPage>
                        </Route>
                        <Route path="/home">
                            <PlayerLayout />
                        </Route>
                        <Route path="/songs/new">
                            <PlayerLayout />
                        </Route>
                        <Route path="/songs/:songId/edit">
                            <PlayerLayout />
                        </Route>
                        <Route path="/users/:userId">
                            <PlayerLayout />
                        </Route>
                    </Switch>
                </>
            )}
        </RootContainer>
    );
}

export default Root;
