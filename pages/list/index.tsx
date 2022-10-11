import React, { useEffect, useState } from "react";
import TrackPagination from "../../components/TrackPagination";
import MainLayout from "../../layouts/MainLayout";
import { Grid, Card, Box } from "@mui/material";
import TrackInfoList from "../../components/TrackInfoList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { NextThunkDispatch } from "../../store";
import { fetchWithPagination, fetchTrackCount } from "../../store/action-creators/track";

const Index = () => {

  const itemsInPage = 2;
  const {tracks, count, error} = useTypedSelector(state => state.track);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch() as NextThunkDispatch;

  const onChangeHandler = (e: React.ChangeEvent, page: number) => {
    setOffset((page - 1) * 2);
  }
  
  const fetchPage = async() => {
    await dispatch(await fetchWithPagination(itemsInPage, offset));
  }

  const getItemCount = async() => {
    await dispatch(await fetchTrackCount());
  }

  useEffect(() => { getItemCount() }, []);
  useEffect(() => { fetchPage() }, [offset]);
  
  if(error) {
    return <MainLayout title={""} description={""} keywords={""}><h2>No one page with tracks found</h2><p><i>{error}</i></p></MainLayout>
  }

  return (
    <div>
      <MainLayout title={""} description={""} keywords={""} >
        <h1 style={{textAlign:"center", color:"darkblue"}}>PAGED LIST</h1>
        <Grid container justifyContent="center" direction={"column"} >
          <TrackPagination itemsInPage={itemsInPage} totalItemCount={count} onChangeHandler={onChangeHandler} />
          <Card style={{minWidth:"600px", width:"60%", margin:"10px auto"}} variant={"outlined"} >
            <TrackInfoList tracks={ tracks } />
          </Card>
        </Grid>
      </MainLayout>
    </div>
  );
}
export default Index;
