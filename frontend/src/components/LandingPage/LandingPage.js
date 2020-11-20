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
    background-color: #c054eb;
    border: 0px;
    width: 200px;
    height: 33.33px;
    letter-spacing: 0.1rem;
    color: #f5f7f9;
    border-radius: 50px;
    box-shadow: rgba(149, 157, 165, 0.15) 0px 8px 24px;
    font-size: 0.7rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
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
                        <LandingButton
                            style={{
                                textDecoration: "none",
                                textAlign: "center",
                                backgroundColor: "transparent",
                                border: "1px solid #c054eb",
                            }}
                            to="/signup"
                        >
                            SIGN UP FREE
                        </LandingButton>
                    </ButtonContainer>
                </Left>
            </LandingPageContainer>
        </>
    );
}
