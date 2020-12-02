import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
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
`;

const NavGroup = styled.ul`
    list-style: none;
    margin: 10px;
    padding: 20px;
`;

const SideNavLink = styled(NavLink)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f7f9;

    &:active {
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
export default function SideNav({ userId }) {
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
                </NavGroup>
            </SideBar>
        </>
    );
}
