import React from "react";
import { Card, Container, Stepper, Step, StepLabel, Grid } from "@mui/material";

interface StepWrapperProps {
    activeStep: number;
}

const steps = ["Treck info", "Cover loading", "Track loading"];

const StepWrapper = ( {activeStep, children} ) => {
  return (
    <Container>
      <Stepper activeStep={activeStep} >
        {steps.map(
          (st, index) => 
            <Step key={index} completed={activeStep > index}>
                <StepLabel>{st}</StepLabel>
            </Step>
          )}
      </Stepper>
      <Grid container justifyContent={"center"} style={{margin:"30px 0", height:250}}>
        <Card style={{width:"600px", backgroundColor:"lightskyblue"}}>
          { children }
        </Card>
      </Grid>
    </Container>
  );
}
export default StepWrapper;
