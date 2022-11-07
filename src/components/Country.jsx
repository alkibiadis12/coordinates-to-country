import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function Country(props) {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${props.data.toLowerCase()}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Country not found! 😢');
        }
        return response.json();
      })
      .then(d => {
        setData(d[0]);
        console.log(d[0]);
      });
  }, [props.data]);

  return (
    <Grid item xs={12} md={6}>
      {JSON.stringify(data) !== JSON.stringify({}) ? (
        <Paper sx={{ padding: 2, width: 300 }}>
          {
            <>
              <Box>
                {data.flags?.svg ? (
                  <img src={`${data.flags.svg}`} width="300" />
                ) : (
                  <img src={`${data.flags.png}`} width="300" />
                )}
              </Box>
              <Box sx={{ marginLeft: -1.6 }}>
                <List
                  component={Stack}
                  direction="row"
                  spacing={0}
                  divider={<Divider orientation="vertical" flexItem />}
                  alignItems="flex-start"
                >
                  <ListItem>
                    <ListItemText
                      primary="Capital"
                      secondary={data?.capital ? data.capital : 'No data'}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary="Region"
                      secondary={data?.region ? data.region : 'No data'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Population"
                      secondary={
                        data?.population
                          ? (+data.population / 1000000).toFixed(1) + ' mil'
                          : 'No data'
                      }
                    />
                  </ListItem>
                </List>
              </Box>
            </>
          }
        </Paper>
      ) : (
        <div></div>
      )}
    </Grid>
  );
}
