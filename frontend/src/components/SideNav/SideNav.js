import React from "react";
import { useSelector, useDispatch } from "react-redux";

import * as sessionActions from "../../store/session";
import styled from "styled-components";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { NavLink, BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "../HomePage/HomePage";
import UploadSongPage from "../UploadSongPage/UploadSongPage";
import ProfilePage from "../ProfilePage/ProfilePage";

const SideBar = styled.div`
    height: 100%;
    width: 200px;
    background-color: #1f2933;
    grid-area: side-nav;
    z-index: 4;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const NavGroup = styled.ul`
    list-style: none;
    margin: 10px;
    padding: 20px;
`;

const LogOutCOntainer = styled.div`
    display: flex;

    bottom: 1000px;
    left: 0;
`;

const SideNavLink = styled(NavLink)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f7f9;

    &:active {
        color: #3ea4bc;
    }
`;

const NavTitle = styled.h3`
    margin-left: 20px;
`;

const LogoContainer = styled.div`
    margin-top: 15px;
    max-width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;

    max-height: 70px;
`;

const Logo = styled.img`
    max-width: 200px;
    max-height: 70px;
    padding-left: 10px;
`;

const LogoutButton = styled.div`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #3ea4bc;
    background-color: transparent;
    border: 0;
    &:active {
        color: #f5f7f9;
    }
    height: auto;
`;
export default function SideNav({ userId }) {
    const dispatch = useDispatch();
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };
    // const user = useSelector((state) => state.session.user);
    return (
        <>
            <SideBar>
                <LogoContainer>
                    <Logo src={window.location.origin + "/octuorLogo.png"} />
                </LogoContainer>
                <NavGroup>
                    <li>
                        <SideNavLink to="/home">
                            <HomeIcon />
                            <NavTitle>Home</NavTitle>
                        </SideNavLink>
                    </li>
                    <li>
                        <SideNavLink to="/songs/new">
                            <CloudUploadIcon />
                            <NavTitle>Upload</NavTitle>
                        </SideNavLink>
                    </li>
                    <li>
                        <SideNavLink to={`/users/${userId}`}>
                            <PersonIcon />
                            <NavTitle>Profile</NavTitle>
                        </SideNavLink>
                    </li>
                    <li>
                        <LogoutButton onClick={logout}>
                            <ExitToAppIcon />
                            <NavTitle>Logout</NavTitle>
                        </LogoutButton>
                    </li>
                </NavGroup>
            </SideBar>
        </>
    );
}
