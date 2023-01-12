import React, { useState } from 'react';
import { MainLayout } from '../layouts/main-layout';
import { Box, Button, Card, Container, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { ITrack } from '../../types/track.interface';
import { useInput } from '../../hooks/use-input';

type TProps = { trackFromServer: ITrack };
const TrackInfo: React.FC = ({ trackFromServer }: TProps) => {
  const router = useRouter();

  const [track, setTrack] = useState<ITrack>(trackFromServer)

  const userName = useInput('');
  const comment = useInput('');

  const addComment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/track/comment', {
        userName: userName.value,
        text: comment.value,
        trackId: track._id
      });

      setTrack({ ...track, comments: [...track.comments, response.data] });
    } catch (e) {
      console.error(e);
    }
  }

  if (!track) {
    return (
      <MainLayout>
        <Container>
          <h1>Трек не найден</h1>
        </Container>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Container>
        <Button variant="outlined" onClick={() => router.push('/tracks')}>Go to tracks list</Button>
        <div style={{ height: 30 }}/>
        <Card>
          <Box p={3} width="100%">
            <Grid container alignItems="center">
              <img src={'http://localhost:5000/' + track.picture} alt={track.name} width={100} height="auto" />
              <Grid>
                <Box paddingLeft="30px">
                  <h3>Name: {track.name}</h3>
                  <h3>Artist: {track.artist}</h3>
                  <h3>Listened: 0</h3>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box p={3}>
            <h1>Lyric</h1>
            <p>{track.text}</p>
          </Box>
        </Card>
        <div style={{ height: 30 }}/>
        <Card style={{ marginBottom: 30 }}>
          <Box p={3}>
            <h3>Comments</h3>
            {
              track.comments.map(c => (
                <Card key={c._id} style={{ marginBottom: 30 }}>
                  <Box p={3}>
                    <h3>{c.userName}</h3>
                    <p>{c.text}</p>
                  </Box>
                </Card>
              ))
            }
            <TextField {...userName} fullWidth margin="dense" label="Your name" type="text" />
            <TextField {...comment} fullWidth margin="dense" label="Your comment" multiline rows={4} />
            <Button fullWidth variant="contained" onClick={addComment}>Send</Button>
          </Box>
        </Card>
      </Container>
    </MainLayout>
  );
};

export default TrackInfo;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get(`http://localhost:5000/api/track/${params.id}`);

  return ({
    props: { trackFromServer: response.data }
  });
}
