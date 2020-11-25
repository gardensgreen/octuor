import React, { createRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const VideoOverLay = styled.div`
    position: fixed;

    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
`;
const VideoBackground = styled.video`
    position: fixed;

    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
`;

const LandingPageContainer = styled.div`
    display: flex;
    margin-top: 60px;
`;

const Left = styled.div`
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 30px;
    z-index: 1;
`;

const Header = styled.h2`
    font-size: 64px;
    line-height: 64px;
    color: #f5f7f9;
`;

const LandingContent = styled.h3`
    font-size: 18px;
    line-height: 24px;
    color: #f5f7f9;
`;

const LandingButton = styled(NavLink)`
    margin-top: 20px;
    background-color: #a239a0;
    border: 0px;
    width: 200px;
    height: 33.33px;
    letter-spacing: 0.1rem;
    color: #f5f7f9;
    border-radius: 50px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    font-size: 0.7rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.5s;
    transition-timing-function: ease-in-out;
    &:hover {
        background-color: #c054be;
    }
`;

const LandingButton2 = styled(NavLink)`
    margin-top: 20px;
    background-color: #00a3bf;
    border: 0px;
    width: 200px;
    height: 33.33px;
    letter-spacing: 0.1rem;
    color: #f5f7f9;
    border-radius: 50px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    font-size: 0.7rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.5s;
    transition-timing-function: ease-in-out;
    &:hover {
        background-color: #00b8d9;
    }
    text-decoration: none;
`;

const ButtonContainer = styled.div`
    display: flex;
`;

export default function LandingPage() {
    const video = createRef();
    useEffect(() => {
        const current = video.current;
        video.current.play();
        // video.current.play;

        return () => {
            if (current) current.pause();
        };
    }, [video]);
    return (
        <>
            <VideoBackground autoplay muted loop ref={video}>
                <source
                    src={
                        window.location.origin + "/AnimatedBackground_Trim.mp4"
                    }
                    type="video/mp4"
                />
            </VideoBackground>
            <VideoOverLay></VideoOverLay>
            <LandingPageContainer>
                <Left>
                    <Header>Sharing is everything.</Header>
                    <LandingContent>Listening is just a plus.</LandingContent>
                    <ButtonContainer>
                        <LandingButton
                            style={{
                                textDecoration: "none",
                                textAlign: "center",
                                marginRight: "10px",
                            }}
                            to="/home"
                        >
                            OPEN WEB PLAYER
                        </LandingButton>
                        <LandingButton2 to="/signup">
                            SIGN UP FREE
                        </LandingButton2>
                    </ButtonContainer>
                </Left>
            </LandingPageContainer>
        </>
    );
}
