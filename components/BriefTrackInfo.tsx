import { ITrack } from "../types/ITrack";
import { Card, Grid } from "@mui/material";
import React from "react";

interface BriefTrackItemProps {
    briefInfo: ITrack;
}

const BriefTrackInfo: React.FC<BriefTrackItemProps> = ( { briefInfo } ) => {
  return (
    // justifyContent={"space-between"} justifyItems={"center"} display={"flex"}
    <Card style={{justifyContent:"space-between", alignItems:"center", justifyItems:"center", display:"flex", marginBottom:20}}>
      <div>
        <img src={`http://localhost:5000/${briefInfo.picture}`} width={120} height={100} style={{display:"block"}} alt="Not found"/>
      </div>
      <Grid container direction={"column"} >
        <div style={{color:"darkblue",fontSize:"28px", marginLeft:10}}>
          <b><i>{briefInfo.name}</i></b>
        </div>
        <div style={{fontSize:"14px", marginLeft:70, color:"blue"}}>
          <b>{briefInfo.artist}</b>
        </div>
        <div style={{fontSize:"10px", textAlign:"right", marginRight:5}}>
          <span><b>Comments: </b></span>{briefInfo.comments.length}
        </div>
      </Grid>
    </Card>
  );
}
export default BriefTrackInfo;
