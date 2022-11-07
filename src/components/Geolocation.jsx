import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';

const APIKEY = '284746024267326698306x115174';

export default function Geolocation(props) {
  const [geoLocationData, setGeoLocationData] = React.useState({});

  React.useEffect(() => {
    fetch(
      `https://geocode.xyz/${props.data.latitude},${props.data.longitude}?geoit=json&auth=${APIKEY}`
    )
      .then(response => {
        //console.log(response);
        if (!response.ok) {
          throw new Error('Too many tries! Try again in 1 minute. 😢');
        }
        return response.json();
      })
      .then(data => {
        setGeoLocationData(data);
        //console.log(data);
      })
      .catch(err => {
        console.error(`Error: ${err}`);
      });
  }, [props.data]);

  const fieldCheck = field => {
    let temp;
    if (geoLocationData?.[`${field}`]) {
      temp = geoLocationData[`${field}`];
    } else if (geoLocationData?.standard) {
      if (geoLocationData.standard?.[`${field}`]) {
        temp = geoLocationData.standard[`${field}`];
      }
    } else {
      temp = `No ${field} data`;
    }
    return temp;
  };

  const getCountryInfoHandler = () => {
    if (geoLocationData?.country) {
      props.onSendData(geoLocationData.country);
    } else {
      props.onSendData(geoLocationData.standard.country);
    }
  };

  let content = '';
  if (JSON.stringify(geoLocationData) !== JSON.stringify({})) {
    content = (
      <Paper>
        <List sx={{ width: '100%', maxWidth: 360, height: 318 }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocationCityIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="City" secondary={fieldCheck('city')} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FlagCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Country" secondary={fieldCheck('country')} />
          </ListItem>
          {fieldCheck('country') !== 'No country data' && (
            <ListItem>
              <Button
                variant="outlined"
                color="primary"
                onClick={getCountryInfoHandler}
              >
                GET COUNTRY INFO
              </Button>
            </ListItem>
          )}
        </List>
      </Paper>
    );
    if (geoLocationData.matches === null) {
      content = (
        <Paper>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h5" component="p">
              No matches
            </Typography>
          </Box>
        </Paper>
      );
    }
  } else {
    content = <></>;
  }

  return (
    <Grid item xs={12} md={6}>
      {content}
    </Grid>
  );
}
