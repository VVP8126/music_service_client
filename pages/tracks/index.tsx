import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Box, Grid, Card, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import TrackList from "../../components/TrackList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { wrapper } from "../../store";
import { fetchTracks, searchTrack } from "../../store/action-creators/track";
import { NextThunkDispatch } from "./../../store";
import { NextPage } from "next";
import { RootState } from "../../store/reducers";
import { useDispatch } from "react-redux";

const Index: NextPage<RootState> = () => {

  const router = useRouter();
  const {tracks, error} = useTypedSelector(state => state.track);
  const [query, setQuery] = useState<string>("");
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch() as NextThunkDispatch;
  
  const search = async(e:React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // Mechanism of query sending with timer (in 500ms after last button press)
    if(timer) {
      clearTimeout(timer);
    }
    setTimer(setTimeout( async () => {
      await dispatch(await searchTrack(e.target.value));
    }, 500));
  }

  if(error) {
    return <MainLayout title={""} description={""} keywords={""}><h2>Tracks not loaded</h2><p><i>{error}</i></p></MainLayout>
  }

  return (
    <>
      <MainLayout title={""} description={""} keywords={""} >
        <Grid container justifyContent="center" >
          <Card style={{minWidth:"600px", width:"60%"}} >
            <Box p={4}>
              <Grid container justifyContent="space-between">
                <h2 style={{textAlign:"center", color:"darkblue"}}>TRACK LIST</h2>
                <Button onClick={() => router.push("/tracks/create")} variant="outlined">LOAD</Button>
              </Grid>
            </Box>
            <Box p={3}><TextField fullWidth value={query} onChange={search} placeholder={"Search track by author"} /></Box>
            <TrackList tracks={tracks} />
          </Card>
        </Grid>
      </MainLayout>
    </>
  );
}

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(store => async ({req, res, ...rest}) => {
  try {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchTracks());
    return { props: {} }
  } catch (e) {
    return { props: {} }
  }
});
