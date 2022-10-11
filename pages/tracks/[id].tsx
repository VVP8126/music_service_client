import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { ITrack } from "../../types/ITrack";
import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import axios from "axios";
import useInput from "../../hooks/useInput";

const TrackPage = ({trackInfo}) => {

  const router = useRouter();
  const [track, setTrack] = useState<ITrack>(trackInfo);
  const username = useInput("");
  const text = useInput("");
  
  const addComment = async() => {
    try {
      const responce = await axios.post(
        "http://localhost:5000/track/comment",
        { username: username.value,
          text: text.value,
          trackId: track._id
        }
      );
      setTrack({...track, comments:[...track.comments, responce.data]});
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <MainLayout title={`Sound track info: ${track.name}`} description={""} keywords={"nature, sounds"} >
      <Button variant="contained" onClick={() => router.push("/tracks")} >BACK TO LIST</Button>
      <Grid container style={{margin:"20px 10px"}}>
        <img src={`http://localhost:5000/${track.picture}`} alt="Picture not found" width={200} height={200} />
        <div style={{padding:"5px"}}>
            <h2>Track title: {track.name}</h2>
            <h3>Artist: <i>{track.artist}</i></h3>
            <h4 style={{textAlign:"center"}}>Listens: {track.listens}</h4>
        </div>
      </Grid>
      <h2>Track text:</h2>
      <p>{track.text}</p>
      <Grid container>
        <h3 style={{textAlign:"center", color:"darkblue"}}>Leave comment</h3>
        <TextField label="Name" {...username} fullWidth style={{marginTop:"10px"}} />
        <TextField label="Comments" {...text} fullWidth multiline rows={4} style={{marginTop:"10px"}} />
        <Button variant="outlined" onClick={addComment} style={{margin:"30px auto 60px"}} >Send comment</Button><br/>
      </Grid>
      <Grid container direction={"column"} style={{marginBottom:"50px"}} >
        {track.comments.map(c => 
          <div key={c._id} style={{fontSize:"12px"}}>
            <p><b><i>{c.username}</i></b><br/>{c.text}</p>
          </div>
        )}
      </Grid>
    </MainLayout>
  );
}
export default TrackPage;

export const getServerSideProps: GetServerSideProps = async({params}) => {
  const responce = await axios.get(`http://localhost:5000/track/${params.id}`);
  return {
    props: { trackInfo: responce.data }
  }
}
