import Input from './components/Input';
import Geolocation from './components/Geolocation';
import Country from './components/Country';
import SampleData from './components/SampleData';
import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function App() {
  const [dataInput, setDataInput] = React.useState({});
  const [dataGeolocation, setDataGeolocation] = React.useState('');
  const [countryOpacity, setCountryOpacity] = React.useState(false);

  const onReceiveDataInput = data => {
    setDataInput(data);
    setCountryOpacity(false);
  };

  const onReceiveDataGeolocation = data => {
    setDataGeolocation(data);
    setCountryOpacity(true);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 5 }}>
      <Grid container spacing={2} justifyContent="space-between">
        <SampleData />
        <Input onSendData={onReceiveDataInput} />
        {JSON.stringify(dataInput) !== JSON.stringify({}) && (
          <Geolocation data={dataInput} onSendData={onReceiveDataGeolocation} />
        )}
        {dataGeolocation !== '' && countryOpacity && (
          <Country data={dataGeolocation} />
        )}
      </Grid>
    </Container>
  );
}

export default App;
