import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/main-layout';
import { Button, Grid, TextField } from '@mui/material';
import { StepWrapper } from '../../component/step-wrapper';
import { FileLoader } from '../../component/file-loader';
import { useInput } from '../../hooks/use-input';
import axios from 'axios';
import { useRouter } from 'next/router';

const Create = (): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState<File>();
  const [dataUrl, setDataUrl] = useState<string>();
  const [audio, setAudio] = useState<File>();

  const router = useRouter();

  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');

  const next = () => {
    if (activeStep === 3) return;

    setActiveStep(activeStep + 1);
  }

  const save = () => {
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('artist', artist.value);
    formData.append('text', text.value);
    formData.append('image', picture);
    formData.append('trackFile', audio);

    axios.post('http://localhost:5000/api/track', formData)
      .then(() => router.push('/tracks'))
      .catch(e => console.error(e));
  }

  useEffect(() => {
    if (!picture) return;

    const reader = new FileReader();

    reader.onloadend =(e) => {
      setDataUrl(e.target.result as string);
    }

    reader.readAsDataURL(picture);
  }, [picture]);

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {
          activeStep === 0 &&
          <Grid container direction="column" flexGrow={1}>
            <TextField {...name} label="Name" fullWidth margin="dense" />
            <TextField {...artist} label="Artist" fullWidth margin="dense" />
            <TextField {...text} label="Lyric" fullWidth margin="dense" />
          </Grid>
        }
        {activeStep === 1 &&
          <Grid container direction="column" flexGrow={1}>
            {
              dataUrl &&
              <img
                style={{ maxHeight: '300px', maxWidth: '300px', marginBottom: 30 }}
                src={dataUrl} alt="Picture"
              />
            }
            <FileLoader accept="image/*" setFile={setPicture}>
              <Button variant="outlined">Upload picture</Button>
            </FileLoader>
          </Grid>
        }
        {activeStep === 2 &&
          <Grid container direction="column" flexGrow={1}>
            {audio && <h5>{audio.name}</h5>}
            <FileLoader accept="audio/*" setFile={setAudio}>
              <Button variant="outlined">Upload audio</Button>
            </FileLoader>
          </Grid>
        }
        <Grid container justifyContent="space-between">
          <Button
            disabled={activeStep === 0}
            onClick={() => setActiveStep(activeStep > 0 ? activeStep - 1 : activeStep)}
            variant="contained"
          >
            Prev
          </Button>
          {
            activeStep !== 3 &&
            <Button
              onClick={next}
              variant="contained"
            >
              Next
            </Button>
          }
          {
            activeStep === 3 &&
            <Button
              onClick={save}
              variant="contained"
              color="success"
            >
              Сохранить
            </Button>
          }
        </Grid>
      </StepWrapper>
    </MainLayout>
  );
};

export default Create;
