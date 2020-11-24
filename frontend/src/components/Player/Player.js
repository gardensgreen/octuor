import {
    PlayButton,
    Timer,
    Progress,
    VolumeControl,
} from "react-soundplayer/components";
import { withCustomAudio } from "react-soundplayer/addons";
import styled from "styled-components";
import "./player.css";
const PlayerContainer = styled.div`
    grid-area: now-playing-bar;
    background-color: #3e4c59;
    padding: 1rem;
    display: flex;
    align-items: center;
`;

export const Player = withCustomAudio((props) => {
    const { song, currentTime, duration } = props;
    console.log(props);
    return (
        <PlayerContainer className="p2 border navy  flex flex-center rounded">
            <PlayButton
                className="flex-none h4 mr2 button white btn-big button-outline button-grow bg-orange circle"
                {...props}
            />
            <div className="flex-auto">
                <h2 className="h4 nowrap m0">
                    {song ? song.User.username : ""}
                </h2>
                <h2 className="h4 nowrap caps m0">{song ? song.title : ""}</h2>
                <div className="flex flex-center">
                    <VolumeControl
                        className="mr2 flex flex-center"
                        buttonClassName="flex-none h6 button white btn-small  button-outline button-grow bg-orange circle btn-square"
                        {...props}
                    />
                    <Progress
                        className="mt2 mb2 rounded"
                        innerClassName="rounded-left"
                        value={(currentTime / duration) * 100 || 0}
                        {...props}
                    />
                </div>
            </div>
        </PlayerContainer>
    );
});
