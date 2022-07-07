import { useEffect, useState } from 'react'

import TrackActionButton from '../../reusable-components/track-action-button/track-action-button.component'

import SpotifyIcon from '../../../assets/icons/Spotify_Icon_RGB_Black.png'
import PlayBtn from '../../../assets/icons/play_black24.png'
import AddBtn from '../../../assets/icons/add_black24.png'
import Like from '../../../assets/icons/like24.png'
import Unlike from '../../../assets/icons/unlike24.png'

import { Spotify } from '../../../utils/spotify'

import { WebPlayerContainer, Player, SpotifyAttributor, SpotifyLogo, NowPlayingCover, NowPlayingLabel, TrackControls, ProgressContainer, ProgressBar, ProgressFill } from "./web-player.styles"

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

const WebPlayer = ({authSession, accessToken, gradientAngle, setGradientAngle, deviceID, setDeviceId, playerInstance, setPlayerInstance, nowPlaying, setNowPlaying }) => {

    const [currentTrack, setCurrentTrack] = useState(track)
    const [playerPosition, setPlayerPosition] = useState(null)
    const [duration, setDuration] = useState(0)
    const [active, setActive] = useState(false)

    const togglePlay = () => {
        playerInstance.togglePlay()
    }

    const nowPlayingInterval = (player) => {
        console.log({player})
        const interval =  setInterval( () => {
            setGradientAngle(gradientAngle => gradientAngle - 2 )
            player.getCurrentState().then( ({position}) => {
                console.log(position)
                setPlayerPosition(position => (position))
            })
            if (playerPosition === 0) {
                clearInterval(interval)
                setActive(false)
                setNowPlaying('', null)
            }
        }, 1000);
    }

    const toggleLike = () => {
        if (!nowPlaying.trackId.length) {
            return
          }
          if (nowPlaying.isLike) {
            Spotify.deleteLike(nowPlaying.trackId)
            setNowPlaying(nowPlaying => ({...nowPlaying, isLike: false}))
            // document.getElementById('likesMessage').innerHTML = 'Removed from Liked Songs'
            // setTimeout(() => document.getElementById('likesMessage').innerHTML = '', 3000);
          } else {
            Spotify.addLike(nowPlaying.trackId)
            setNowPlaying(nowPlaying => ({...nowPlaying, isLike: true}))
            // document.getElementById('likesMessage').innerHTML = 'Added to Liked Songs'
            // setTimeout(() => document.getElementById('likesMessage').innerHTML = '', 3000);
          }
    }

    const addTrack = () => {
        console.log('add track yo')
    }

    useEffect(() => {

            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
        
            document.body.appendChild(script);
        
            window.onSpotifyWebPlaybackSDKReady = () => {
            
                const player = new window.Spotify.Player({
                    name: 'Assemble the Jams',
                    getOAuthToken: cb => { cb(accessToken); },
                    volume: 0.5
                });
            
            
                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                    setDeviceId(device_id);
                    setPlayerInstance(player)
                });
            
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });
            
                player.addListener('player_state_changed', ( state => {
                    console.log('player_state_changed', state)
                    if (!state) {
                        return;
                    }
                
                    setCurrentTrack(state.track_window.current_track)
                    setPlayerPosition(state.position)
                    setDuration(state.duration)
                
                    player.getCurrentState().then( currentState => {
                        (!currentState) ? setActive(false) : setActive(true)
                    })
                    
                }));
                nowPlayingInterval(player)
                player.connect();
            };

    },[])

    let LikeOrUnlike = nowPlaying.isLike ? Like : Unlike

    let currentPosition = playerPosition / 1000
    let positionMins = Math.floor(currentPosition / 60).toString()
    let positionSec = (currentPosition % 60).toFixed(0).toString()
    positionSec = positionSec.length < 2 ? '0' + positionSec : positionSec

    let currentDuration = duration / 1000
    let durationMins = Math.floor(currentDuration / 60).toString()
    let durationSec = (currentDuration % 60).toFixed(0).toString()
    durationSec = durationSec.length < 2 ? '0' + durationSec : durationSec

    const progress = (playerPosition/duration)*100
    
    return (
        <WebPlayerContainer>
            <Player active={active} >
                <SpotifyAttributor className='listen-on' href='https://open.spotify.com/' target='_blank' rel="noreferrer">
                        <SpotifyLogo src={SpotifyIcon} id='spotify-icon' alt='spotify icon'/>
                        <p>Listen on Spotify</p>
                </SpotifyAttributor>

                <NowPlayingCover  src={currentTrack.album.images[0].url} 
                     alt="" 
                />
                <NowPlayingLabel>
                    <div >{currentTrack.name}</div>
                    <div >{currentTrack.artists[0].name}</div>
                </NowPlayingLabel>
                <TrackControls>
                     <TrackActionButton onClick={togglePlay} src={PlayBtn} alt='play or pause button'/>
                     <TrackActionButton onClick={addTrack} src={AddBtn} alt='button to add track to playlist'/>
                     <TrackActionButton onClick={toggleLike} src={LikeOrUnlike} alt='button to add/remove song from liked songs' />
                </TrackControls>   
                {/* <p id='likesMessage'></p> */}
                <ProgressContainer>
                    <p>{`${positionMins}:${positionSec}`}</p>
                    <ProgressBar>
                        <ProgressFill width={`${progress}%`} />
                    </ProgressBar>
                    <p>{`${durationMins}:${durationSec}`}</p>
                </ProgressContainer>
            </Player>
        </WebPlayerContainer>
    )
}

export default WebPlayer