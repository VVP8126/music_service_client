import React, { useState } from "react";
import StepWrapper from "../../components/StepWrapper";
import MainLayout from "../../layouts/MainLayout";
import { Button, Grid, TextField } from "@mui/material";
import FileUpload from "../../components/FileUpload";
import useInput from "../../hooks/useInput";
import { useRouter } from "next/router";
import axios from "axios";

const Create = () => {
  
  const [activeStep, setActiveStep] = useState(0);
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const name = useInput("");
  const artist = useInput("");
  const text = useInput("");

  const router = useRouter();

  const next = () => {
    if(activeStep !== 2) {
      setActiveStep(prev => prev + 1)
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("text", text.value);
      formData.append("artist", artist.value);
      formData.append("picture", image);
      formData.append("audio", audio);
      axios.post("http://localhost:5000/track/create", formData)
           .then(resp => router.push("/tracks"))
           .catch(e => console.log(e));
    }
  }
  
  const back = () => { setActiveStep(prev => prev - 1) }

  return (
    <MainLayout title={"Add track"} description={""} keywords={""} >
      <StepWrapper activeStep={activeStep} >
        <h2 style={{textAlign:"center"}}>ADD NEW TRACK</h2>
        { activeStep === 0 &&
            <Grid container direction={"column"} style={{padding:5}}>
              <h3>Enter text data</h3>
              <TextField label="Track title" {...name} />
              <TextField label="Author name" {...artist} style={{marginTop:10}} />
              <TextField label="Track words" {...text} multiline rows={3} style={{marginTop:10}} />
            </Grid>
        }
        { activeStep === 1 &&
          <Grid container direction={"column"} style={{padding:5}}>
            <h3>Load cover image</h3>
            <FileUpload setFile={setImage} accept="image/*" ></FileUpload>
          </Grid>
        }
        { activeStep === 2 &&
          <Grid container direction={"column"} style={{padding:5}}>
            <h3>Load audio track</h3>
            <FileUpload setFile={setAudio} accept="audio/*" ></FileUpload>
          </Grid>
        }
      </StepWrapper>
      <Grid container justifyContent={"space-between"}>
        <Button onClick={back} style={{backgroundColor:"darkblue",color:"white"}} disabled={activeStep === 0}>BACK</Button>
        <Button onClick={next} style={{backgroundColor:"darkblue",color:"white"}}>NEXT</Button>
      </Grid>
    </MainLayout>
  );
}

export default Create;
