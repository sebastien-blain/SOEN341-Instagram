import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Upload Image', 'Add Description', 'Confirmation'];
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedFile, setSelectedFile] = React.useState(undefined);
  const [description, setDescription] = React.useState(undefined);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const fileSelectedHandler = (event) => {
    console.log(event.target.files[0])
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  }

  const getDescription = (event) => {
    setDescription(event.target.value);
  }

  const uploadImages = () => {
    console.log(selectedFile);
    console.log(description);
    handleNext();
  }


  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">

      <Step key={steps[0]}>
        <StepLabel>{steps[0]}</StepLabel>
        <StepContent>
          <Input type='file' onChange={fileSelectedHandler}/>
          <div className={classes.actionsContainer}>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>
            </div>
          </div>
        </StepContent>
      </Step>

      <Step key={steps[1]}>
        <StepLabel>{steps[1]}</StepLabel>
        <StepContent>
          <TextField
              id="filled-multiline-static"
              label="Description"
              multiline={true}
              rows="4"
              variant="filled"
              fullWidth={true}
              onChange={getDescription}
            />
          <div className={classes.actionsContainer}>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>
            </div>
          </div>
        </StepContent>
      </Step>


      <Step key={steps[2]}>
        <StepLabel>{steps[2]}</StepLabel>
        <StepContent>
          <img src={selectedFile} alt="preview" style={{width:300,height:300, objectFit:'cover'}}/>
          <Typography>
            Preview of the post will be shown here
            Confirm upload
          </Typography>
          <div className={classes.actionsContainer}>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={uploadImages}
                className={classes.button}
              >
                Finish
              </Button>
            </div>
          </div>
        </StepContent>
      </Step>

      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Image has been uploaded</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Post Another Image
          </Button>
        </Paper>
      )}
    </div>
  );
}
