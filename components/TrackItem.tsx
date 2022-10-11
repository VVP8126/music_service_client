import React from "react";
import { ITrack } from "../types/ITrack";
import { Card, IconButton, Grid, Box } from "@mui/material";
import { PlayArrow, Pause, Delete } from "@mui/icons-material";
import styles from "./../styles/TrackItem.module.scss";
import { useRouter } from "next/router";
import { useActions } from "../hooks/useAction";
import axios from "axios";

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ( {track, active = false} ) => {

    const router = useRouter();
    const { playTrack, setActiveTrack } = useActions();

    const play = (e) => {
        e.stopPropagation();
        setActiveTrack(track);
        playTrack();
    };

    const deleteTrack = async (e) => {
        e.stopPropagation();
        setActiveTrack(null);
        await axios.delete(`http://localhost:5000/track/${track._id}`);
        router.push("/tracks");
    }

    return (
        <Card className={styles.trackCard} onClick={() => router.push("/tracks/" + track._id)} >
            <Grid container justifyContent={"left"}>
                <div><img src={`http://localhost:5000/${track.picture}`} width={50} height={50} alt="Not found"/></div>
                <Grid container direction={"column"} className={styles.labelBlock} >
                    <div className={styles.trackName}>{track.name}</div>
                    <div className={styles.trackArtist}>{track.artist}</div>
                </Grid>
            </Grid>
            <Box p={2}><IconButton onClick={ deleteTrack } ><Delete /></IconButton></Box>
            {!active && <div className={styles.duration}>01:01:01 / 23:59:59</div> }
            <IconButton onClick={ play } >
                { active ? <Pause /> : <PlayArrow /> }
            </IconButton>
        </Card>
    );
}
export default TrackItem;
