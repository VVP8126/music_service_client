import React from "react";
import { ITrack } from "../types/ITrack";
import { Grid, Box } from "@mui/material";
import BriefTrackInfo from "./BriefTrackInfo";

interface TrackInfoListProps {
    tracks: ITrack[],
}

const TrackInfoList: React.FC<TrackInfoListProps> = ( { tracks } ) => {
  return (
    <div>
      <Grid container direction={"column"} style={{backgroundColor:"lightskyblue"}} >
        <Box p={2} >
          { tracks.map(track => <BriefTrackInfo briefInfo={track} key={track._id} />) }
        </Box>
      </Grid>
    </div>
  );
}
export default TrackInfoList;
