import styled from "styled-components";

export const TrackContainer = styled.div`
    display: flex;
    height: fit-content;
    align-items: center;
    border-bottom: 1px solid rgba(256, 256, 256, 0.8);
    margin-top: .5rem;
    padding-bottom: .5rem;
`

export const ReverseTrackContainer = styled(TrackContainer)`
    flex-direction: row-reverse;
`

export const TrackInformation = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 72px;

    h3 {
        margin-bottom: .22rem;
      }

    p {
      font-size: .83rem;
      font-weight: 300;
      color: rgba(256, 256, 256, 0.8);
    }
`

export const ReverseTrackInformation = styled(TrackInformation)`
    align-items: flex-end;
    text-align: right;
`

export const TrackActionContainer = styled.div`
    display: flex;
`