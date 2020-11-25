import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Menu = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end

    width: 400px;
    position: absolute;
    right: 130px;
    top: 45px;
    border-radius: 3px;
    background-color: transparent;
    z-index: 3;
`;

const Icon = styled.img`
    border-radius: 25px;
    right: 40px;
    z-index: 3;
    top: 40px;
    width: 50px;
    height: 50px;
    margin-right: 30px;
    position: absolute;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;
const MenuItem = styled.div`
    padding: 0 10px;
    color: #f5f7f9;
`;

const Link = styled(NavLink)`
    color: #f5f7f9;
    text-decoration: none;
    font-size: 0.9rem;
`;

const Button = styled.button`
    border: 0px;
    background-color: transparent;

    color: #f5f7f9;
    text-decoration: none;
    font-size: 0.9rem;
`;
const NavContent = styled.span`
    text-decoration: none;
    color: #f6f7f9;
`;
function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <Icon
                src={window.location.origin + "/artworkPlaceholder.png"}
                onClick={openMenu}
            />

            {showMenu && (
                <Menu className="profile-dropdown">
                    <MenuItem>
                        <Button onClick={logout}>Log Out</Button>
                    </MenuItem>

                    <MenuItem>
                        <Link to={`/songs/new`}>
                            <NavContent>Upload Song</NavContent>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to={`/users/${user.id}`}>
                            <NavContent>Proifle</NavContent>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to={`/Home`}>
                            <NavContent>Home</NavContent>
                        </Link>
                    </MenuItem>
                </Menu>
            )}
        </>
    );
}

export default ProfileButton;
