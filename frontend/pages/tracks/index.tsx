import React from 'react';
import { MainLayout } from '../layouts/main-layout';
import { Box, Button, Card, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { TrackList } from '../../component/track-list';
import { Player } from '../../component/player';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { TNextThunkDispatch, wrapper } from '../../store';
import { actionCreators } from '../../store/action-creators';

const Tracks = (): JSX.Element => {
  const router = useRouter();

  const { tracks, error } = useTypedSelector(state => state.tracks);

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between" alignItems="center">
              <h1>Tracks list</h1>
              <Button onClick={() => router.push('/tracks/create')}>Add track</Button>
            </Grid>
            <TrackList tracks={tracks} />
          </Box>
        </Card>
      </Grid>
      <Player />
    </MainLayout>
  );
};

export default Tracks;

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
  const dispatch = store.dispatch as TNextThunkDispatch;

  await dispatch(await actionCreators.fetchTracks());
});

