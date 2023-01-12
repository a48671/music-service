import React from 'react';
import { Container, Step, Stepper, StepLabel, Grid, Card } from '@mui/material';
import { GraphicEq } from '@mui/icons-material';
import Box from '@mui/material/Box';

const steps = ['Track info', 'Track picture', 'Track audio'];

interface IProps {
  activeStep: number;
  children: React.ReactNode;
}
export const StepWrapper: React.FC<IProps> = ({ activeStep, children }): JSX.Element => {
  return (
    <Container>
      <Stepper activeStep={activeStep} style={{ width: '100%', height: '30px' }}>
        {steps.map((s, i) => (
          <Step key={i} index={i} completed={i < activeStep}>
            <StepLabel>{s}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container justifyContent="center" style={{ paddingTop: 30 }}>
        <Card>
          <Box p={3}>
            <Grid
              style={{ width: 600, height: 320 }}
              container
              direction="column"
              justifyContent="space-between"
            >
              {children}
            </Grid>
          </Box>
        </Card>
      </Grid>
    </Container>
  );
};

