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
    background-color: transparent;
    z-index: 1;
    grid-area: top-nav;
`;

const NavItem = styled.li`
    box-sizing: border-box;
    padding-right: 30px;
    z-index: 1;
`;

const PageLinks = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0px;
`;

const AuthLinks = styled.ul`
    margin-top: 15px;
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0px;
    justify-content: space-around;
`;

const Logo = styled.img`
    margin-top: 15px;
    max-width: 200px;
    padding-left: 30px;
    max-height: 70px;
`;

const NavContent = styled.span`
    text-decoration: none;
    color: #f6f7f9;
`;

const Link = styled.a`
    text-decoration: none;
    font-size: 0.9rem;
`;
function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        return <ProfileButton user={sessionUser} />;
    } else {
        sessionLinks = (
            <AuthLinks>
                <NavItem>
                    <Link href="https://github.com/gardensgreen/octour/">
                        <NavContent>Github</NavContent>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link href="https://linkedin.com/in/danieltillero/">
                        <NavContent>LinkedIn</NavContent>
                    </Link>
                </NavItem>
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
