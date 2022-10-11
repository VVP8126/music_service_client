import { ITrack } from "../types/ITrack";
import React from "react";
import { Grid, Box } from "@mui/material";
import TrackItem from "./TrackItem";

interface TrackListProps {
    tracks: ITrack[],
}

const TrackList: React.FC<TrackListProps> = ( { tracks } ) => {
  return (
    <Grid container direction={"column"}>
      <Box p={2} >
        { tracks.map(track => <TrackItem track={track} key={track._id} />) }
      </Box>
    </Grid>
  );
}

export default TrackList;
