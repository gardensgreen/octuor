import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";

import styled from "styled-components";

const Nav = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    padding: 10px;
    margin: 0px;
    justify-content: space-between;
    background-color: #1f2933;
`;

const NavItem = styled.li`
    box-sizing: border-box;
    padding-right: 30px;
`;

const PageLinks = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0px;
`;

const AuthLinks = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0px;
    justify-content: space-around;
`;

const Logo = styled.img`
    margin-top: 5px;
    max-width: 150px;
    max-height: 60px;
`;

const NavContent = styled.span`
    text-decoration: none;
    color: #f6f7f9;
`;
function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = <ProfileButton user={sessionUser} />;
    } else {
        sessionLinks = (
            <AuthLinks>
                <NavItem>
                    <NavLink
                        style={{ textDecoration: "none", fontSize: ".9rem" }}
                        to="/signup"
                    >
                        <NavContent>Sign Up</NavContent>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        style={{ textDecoration: "none", fontSize: ".9rem" }}
                        to="/login"
                    >
                        <NavContent>Log In</NavContent>
                    </NavLink>
                </NavItem>
            </AuthLinks>
        );
    }

    return (
        <Nav>
            <PageLinks>
                <NavItem>
                    <NavLink exact to="/">
                        <Logo
                            src={window.location.origin + "/octuorLogo.png"}
                        />
                    </NavLink>
                </NavItem>
            </PageLinks>
            {isLoaded && sessionLinks}
        </Nav>
    );
}

export default Navigation;
