import styled from "styled-components";

export const WebPlayerContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: inherit;
    width: 30%;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    margin-bottom: 1rem;
`

export const Player = styled.div`
    position: relative;
    display: flex;
    width: 80%;
    height: 80%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .6);
    padding: 20px;
    box-shadow: 2px;

    .progress-container {
        width: 100%;
        height: 1rem;
        font-size: .75rem;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        color: black;
      }
    
      .progress-bar {
        width: 60%;
        height: 25%;
        border: 1px solid black;
      }
    
      .progress-fill {
        height: 100%;
        background-color: black;
      }
`

export const NowPlayingCover = styled.img`
    height: 150px;
    width: auto;
    margin-bottom: 1rem;
`

export const NowPlayingLabel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
`

export const TrackControls = styled.div`
    background-color: rgba(255, 255, 255, 0);
    display: flex;
`

export const ProgressContainer = styled.div`
    width: 100%;
    height: 1rem;
    font-size: .75rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: black;
`

export const ProgressBar = styled.div`
    width: 60%;
    height: 25%;
    border: 1px solid black;
`
export const ProgressFill = styled.div`
    height: 100%;
    background-color: black;
    width: ${props => props.width};
`