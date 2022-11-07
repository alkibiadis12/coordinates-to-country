import React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { width } from '@mui/system';

export default function Input(props) {
  const [data, setData] = React.useState({
    latitude: '',
    longitude: '',
  });

  const [dynamicPropsLatitude, setDynamicPropsLatitude] = React.useState({
    error: false,
    helperText: '',
  });

  const [dynamicPropsLongitude, setDynamicPropsLongitude] = React.useState({
    error: false,
    helperText: '',
  });

  const changeHandler = e => {
    const { name, value } = e.target;
    setData(prevData => {
      return { ...prevData, [name]: e.target.value };
    });
  };

  const submitHandler = () => {
    if (
      data.latitude !== '' &&
      data.latitude >= -90 &&
      data.latitude <= 90 &&
      data.longitude !== '' &&
      data.longitude >= -180 &&
      data.longitude <= 180
    ) {
      props.onSendData(data);
      //reset values
      setDynamicPropsLatitude({ error: false, helperText: '' });
      setDynamicPropsLongitude({ error: false, helperText: '' });
      setData({ latitude: '', longitude: '' });
    }

    if (data.latitude === '' || data.latitude < -90 || data.latitude > 90) {
      setDynamicPropsLatitude({
        error: true,
        helperText: 'Invalid value. Enter a value between -90 and 90.',
      });
    } else if (
      data.latitude !== '' &&
      data.latitude >= -90 &&
      data.latitude <= 90
    ) {
      setDynamicPropsLatitude({ error: false, helperText: '' });
    }

    if (
      data.longitude === '' ||
      data.longitude < -180 ||
      data.longitude > 180
    ) {
      setDynamicPropsLongitude({
        error: true,
        helperText: 'Invalid value. Enter a value between -180 and 180.',
      });
    } else if (
      data.longitude !== '' &&
      data.longitude >= -180 &&
      data.longitude <= 180
    ) {
      setDynamicPropsLongitude({ error: false, helperText: '' });
    }
  };

  return (
    <Grid item xs={12} md={6}>
      <Paper sx={{ padding: 2, width: 300, height: 290 }}>
        <FormControl variant="outlined" color="primary">
          <Stack spacing={1.5} sx={{ width: 250 }}>
            <TextField
              label="latitude"
              name="latitude"
              variant="outlined"
              required
              onChange={changeHandler}
              value={data.latitude}
              type="number"
              InputProps={{
                inputProps: {
                  max: 90,
                  min: -90,
                  step: 0.000001,
                },
              }}
              {...dynamicPropsLatitude}
            />
            <TextField
              label="longitude"
              name="longitude"
              variant="outlined"
              required
              onChange={changeHandler}
              value={data.longitude}
              type="number"
              InputProps={{
                inputProps: {
                  max: 180,
                  min: -180,
                  step: 0.000001,
                },
              }}
              {...dynamicPropsLongitude}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={submitHandler}
            >
              Submit
            </Button>
          </Stack>
        </FormControl>
      </Paper>
    </Grid>
  );
}
